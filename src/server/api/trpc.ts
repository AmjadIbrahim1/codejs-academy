/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */

import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { rateLimit } from "@/lib/rate-limiter";
import { logAudit } from "@/server/audit-log";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  // Dynamic imports to prevent Turbopack from bundling server-only modules
  // into the client bundle via the type-import chain from react.tsx
  const [{ db }, { auth }] = await Promise.all([
    import("@/server/db"),
    import("@/server/auth"),
  ]);
  const session = await auth();

  return {
    db,
    session,
    ...opts,
  };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * Create a server-side caller.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Rate limiting middleware for auth-related procedures.
 */
const rateLimitMiddleware = t.middleware(async ({ ctx, next, path }) => {
  if (path.includes("auth.register") || path.includes("auth.login")) {
    const headers = ctx.headers;
    const ip =
      headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      headers.get("x-real-ip") ??
      "unknown";
    const { allowed } = rateLimit(`trpc:${path}:${ip}`, {
      max: 10,
      windowMs: 60_000,
    });
    if (!allowed) {
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "طلبات كتيرة. حاول تاني بعد دقيقة.",
      });
    }
  }
  return next();
});

/**
 * Middleware for timing procedure execution and adding an artificial delay in development.
 *
 * You can remove this if you don't like it, but it can help catch unwanted waterfalls by simulating
 * network latency that would occur in production but not in local development.
 */
const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (t._config.isDev) {
    // artificial delay in dev
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

  return result;
});

/**
 * CSRF protection middleware.
 * Validates Origin/Referer headers for all mutation (POST/PUT/PATCH/DELETE) requests
 * to prevent Cross-Site Request Forgery attacks.
 */
const csrfMiddleware = t.middleware(async ({ ctx, next, type }) => {
  // Only check mutations (state-changing requests)
  if (type === "mutation") {
    const headers = ctx.headers;
    const origin = headers.get("origin");
    const referer = headers.get("referer");
    const host = headers.get("host") ?? "";

    // Allow requests with no origin/referer (e.g., server-side calls, curl)
    if (!origin && !referer) {
      return next();
    }

    const isValidOrigin = (url: string): boolean => {
      try {
        const parsed = new URL(url);
        // Allow the same host
        if (parsed.host === host) return true;
        // Allow localhost variants in development
        if (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") return true;
        return false;
      } catch {
        return false;
      }
    };

    const originValid = origin ? isValidOrigin(origin) : false;
    const refererValid = referer ? isValidOrigin(referer) : false;

    // If we have headers, at least one must be valid
    if ((origin && !originValid) || (referer && !refererValid && !origin)) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "طلب مش مصرح بيه. CSRF protection.",
      });
    }
  }

  return next();
});

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure
  .use(timingMiddleware)
  .use(rateLimitMiddleware)
  .use(csrfMiddleware);

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure
  .use(timingMiddleware)
  .use(rateLimitMiddleware)
  .use(csrfMiddleware)
  .use(({ ctx, next }) => {
    if (!ctx.session?.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        // infers the `session` as non-nullable
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  });

/**
 * Audit logging middleware.
 * Logs every admin mutation to the AuditLog table for security monitoring.
 */
const auditMiddleware = t.middleware(async ({ ctx, next, path, type }) => {
  // Only log mutations
  if (type === "mutation") {
    const result = await next();

    const user = ctx.session?.user;
    if (user) {
      // Map tRPC procedure names to audit actions
      const auditAction = path.endsWith(".create")
        ? "create"
        : path.endsWith(".update") || path.endsWith(".upsert")
          ? "update"
          : path.endsWith(".delete")
            ? "delete"
            : undefined;

      if (auditAction) {
        const headers = ctx.headers;
        const ip =
          headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
          headers.get("x-real-ip") ??
          undefined;

        const [entity] = path.split(".");

        logAudit({
          userId: user.id,
          userEmail: user.email ?? undefined,
          action: auditAction,
          entity: entity ?? path,
          ip,
        }).catch(() => {});
      }
    }

    return result;
  }

  return next();
});

/**
 * Admin-only procedure
 *
 * Checks that the user is authenticated AND has role "admin".
 * All mutation endpoints that modify data should use this.
 */
export const adminProcedure = t.procedure
  .use(timingMiddleware)
  .use(rateLimitMiddleware)
  .use(csrfMiddleware)
  .use(({ ctx, next }) => {
    if (!ctx.session?.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    if (ctx.session.user.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN", message: "مش مسموح. بس للأدمن." });
    }
    return next({
      ctx: {
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  })
  .use(auditMiddleware);
