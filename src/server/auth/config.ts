import { compare } from "bcryptjs";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";

/**
 * Module augmentation for `next-auth` types.
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * IMPORTANT: This file must NOT statically import any server-only modules (db, audit-log).
 * Those are imported dynamically inside callbacks to prevent Turbopack from bundling
 * server-only code into the client bundle via the type-import chain (react.tsx → root.ts).
 */
export const authConfig = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "الإيميل", type: "email" },
        password: { label: "كلمة السر", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;

        // Email domain restriction
        if (!email.endsWith("@codejs.com")) {
          throw new Error("الإيميل لازم يكون من @codejs.com");
        }

        // Dynamic import to prevent client-side bundling of server-only code
        const { db } = await import("@/server/db");

        const user = await db.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) return null;

        const isValid = await compare(password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      },
    }),
    ...(process.env.AUTH_DISCORD_ID && process.env.AUTH_DISCORD_SECRET
      ? [DiscordProvider]
      : []),
  ],
  // adapter is set in auth/index.ts to avoid server-only imports here
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role ?? "student";
      }
      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id as string,
        role: (token.role as string) ?? "student",
      },
    }),
    async signIn({ user }) {
      // Log successful logins to the audit log
      if (user.id && user.email) {
        // Dynamic import to prevent client-side bundling of server-only code
        const { logAudit } = await import("@/server/audit-log");
        logAudit({
          userId: user.id,
          userEmail: user.email,
          action: "login",
          entity: "auth",
          entityId: user.id,
        }).catch(() => {});
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
