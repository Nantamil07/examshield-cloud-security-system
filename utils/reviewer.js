import { supabase } from "../lib/supabase";
import { createAuditLog } from "./audit";

export async function updateQuestionPaperStatus(
  paperId,
  status,
  comment,
  reviewerId
) {
  const { error } = await supabase
    .from("question_papers")
    .update({
      status,
      reviewer_comment: comment,
    })
    .eq("id", paperId);

  if (error) throw error;

  await createAuditLog(
    reviewerId,
    status.toUpperCase(),
    `Reviewer ${status.toLowerCase()} a question paper.`
  );
}