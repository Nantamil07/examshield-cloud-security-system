import { supabase } from "../lib/supabase";

export async function createAuditLog(userId, action, description) {
  const { data, error } = await supabase
    .from("audit_logs")
    .insert({
      user_id: userId,
      action,
      description,
    })
    .select();

  if (error) {
    console.error("Audit Log Error:", error);
    throw error;
  }

  return data;
}