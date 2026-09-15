import { supabase } from "./supabase";

export async function uploadEncryptedPaper(fileName, encryptedData) {
  const { data, error } = await supabase.storage
    .from("question-papers")
    .upload(fileName, encryptedData, {
      contentType: "text/plain",
      upsert: true,
    });

  if (error) {
    throw error;
  }

  return data.path;
}