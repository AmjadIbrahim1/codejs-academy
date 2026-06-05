/**
 * This declaration file re-exports the AppRouter type from the server.
 * 
 * IMPORTANT: Using a .d.ts file prevents Turbopack from following the
 * import chain during client-side bundling. .d.ts files are purely for
 * type checking and are not processed by the bundler.
 */
import type { AppRouter } from "@/server/api/root";

export type { AppRouter };
