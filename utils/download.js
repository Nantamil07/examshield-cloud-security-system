import { supabase } from "../lib/supabase";
import { decryptPDF } from "./encryption";
import { createAuditLog } from "./audit";
import { addWatermark } from "./watermark";
import { generateHash } from "./hashing";
export async function downloadQuestionPaper(paper, user) {

  // Download encrypted file from Supabase Storage
  const { data, error } = await supabase.storage
    .from("question-papers")
    .download(paper.encrypted_file_url);

  if (error) throw error;

  // Read encrypted text
  const encryptedText = await data.text();

  // AES Decrypt
  const decryptedBase64 = decryptPDF(encryptedText);

  // Convert Base64 back into binary PDF
  const response = await fetch(decryptedBase64);

const pdfBlob = await response.blob();

const pdfBytes = await pdfBlob.arrayBuffer();

// Keep original PDF bytes
const originalPdfBytes = pdfBytes;

// Create a watermarked copy for download
const watermarkedPdf = await addWatermark(pdfBytes, user.email);

// Convert watermarked bytes into Base64
const watermarkedBase64 =
  "data:application/pdf;base64," +
  btoa(
    String.fromCharCode(...new Uint8Array(watermarkedPdf))
  );

// SHA-256 of watermarked PDF
const watermarkedHash = generateHash(watermarkedBase64);

// Save it in database
await supabase
  .from("question_papers")
  .update({
    watermarked_hash: watermarkedHash,
  })
  .eq("id", paper.id);

const finalBlob = new Blob([watermarkedPdf], {
  type: "application/pdf",
});

  // Create download link
  const url = URL.createObjectURL(finalBlob);

  const link = document.createElement("a");
  link.href = url;

  // Download with original filename
  const originalName = paper.encrypted_filename.replace(".enc", "");

  link.download = originalName;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);

  // Audit log
  await createAuditLog(
  user.id,
  "DOWNLOAD",
  `Downloaded ${originalName}`
);

}