import { supabase } from "../lib/supabase";
import { createAuditLog } from "./audit";

// ---------------- APPROVE QUESTION PAPER ----------------

export async function approvePaper(paperId, user) {
  const { error } = await supabase
    .from("question_papers")
    .update({
      status: "Approved",
      reviewer_comment: "",
    })
    .eq("id", paperId);

  if (error) {
    throw new Error(error.message);
  }

  // Audit log
  await createAuditLog(
    user?.id,
    "Paper Approved",
    `Question paper ${paperId} approved by reviewer.`
  );
}

// ---------------- REJECT QUESTION PAPER ----------------

export async function rejectPaper(paperId, comment, user) {
  const { error } = await supabase
    .from("question_papers")
    .update({
      status: "Rejected",
      reviewer_comment: comment,
    })
    .eq("id", paperId);

  if (error) {
    throw new Error(error.message);
  }

  // Audit log
  await createAuditLog(
    user?.id,
    "Paper Rejected",
    `Question paper ${paperId} rejected. Comment: ${comment}`
  );
}