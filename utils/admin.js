import { supabase } from "../lib/supabase";
import { createAuditLog } from "./audit";

export async function scheduleRelease(
  paperId,
  releaseTime,
  adminId
) {
  const { error } = await supabase
    .from("question_papers")
    .update({
      release_time: releaseTime,
      status: "Scheduled",
    })
    .eq("id", paperId);

  if (error) throw error;

  await createAuditLog(
    adminId,
    "SCHEDULED",
    `Scheduled question paper release for ${releaseTime}`
  );
}
export async function releaseQuestionPaper(paperId) {
  const { error } = await supabase
    .from("question_papers")
    .update({
      status: "Released",
    })
    .eq("id", paperId);

  if (error) throw error;
}