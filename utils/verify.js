import { supabase } from "../lib/supabase";
import { generateHash } from "./hashing";

export async function verifyQuestionPaper(file) {

  const reader = new FileReader();

  return new Promise((resolve, reject) => {

    reader.onload = async () => {
  try {
    const base64 = reader.result;

    // Remove watermark if present
    const normalizedBase64 = base64
      .replace(/CONFIDENTIAL/g, "")
      .replace(/Exam Center.*$/gm, "")
      .replace(/Downloaded.*$/gm, "");

    const uploadHash = generateHash(normalizedBase64);

    const { data, error } = await supabase
      .from("question_papers")
      .select("*");

    if (error) throw error;

const paper = data.find(
  (item) =>
    item.hash === uploadHash ||
    item.watermarked_hash === uploadHash
);
    resolve({
  valid: true,
  uploadHash,
  paper,
  matchedHash:
    paper.hash === uploadHash
      ? "Original PDF"
      : "Official Watermarked PDF",
});
  } catch (err) {
    reject(err);
  }
};

    reader.readAsDataURL(file);

  });

}