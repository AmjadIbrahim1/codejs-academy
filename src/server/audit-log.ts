export interface AuditLogEntry {
  userId?: string;
  userEmail?: string;
  action: "create" | "update" | "delete" | "login" | "role_change" | "settings_change";
  entity: string;
  entityId?: string;
  details?: Record<string, unknown>;
  ip?: string;
}

/**
 * Log an administrative action to the audit log.
 * This is called from tRPC procedures to track all state-changing admin operations.
 *
 * Uses a dynamic import for db to prevent the server-only module from being
 * bundled into the client-side bundle.
 *
 * @param entry - The audit log entry to record
 */
export async function logAudit(entry: AuditLogEntry): Promise<void> {
  try {
    // Dynamic import ensures server-only code (db) is never bundled on the client
    const { db } = await import("@/server/db");
    await db.auditLog.create({
      data: {
        userId: entry.userId,
        userEmail: entry.userEmail,
        action: entry.action,
        entity: entry.entity,
        entityId: entry.entityId,
        details: entry.details ? JSON.stringify(entry.details) : null,
        ip: entry.ip,
      },
    });
  } catch (error) {
    // Never throw from audit logging - it should never break the app
    console.error("[AUDIT_LOG] Failed to write audit log:", error);
  }
}
