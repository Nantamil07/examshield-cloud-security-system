import { supabase } from "../lib/supabase";
import { encryptPDF } from "./encryption";
import { generateHash } from "./hashing";
import { uploadEncryptedPaper } from "../lib/storage";
import { createAuditLog } from "./audit";

export async function uploadQuestionPaper(file, meta, user) {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = async () => {
      try {
        // Convert PDF into Base64
        const base64Data = reader.result;

        // Encrypt PDF
        const encryptedData = encryptPDF(base64Data);

        // Generate Integrity Hash
        const hash = generateHash(base64Data);

        // Create unique encrypted filename
        const encryptedFileName =
          Date.now() + "_" + file.name + ".enc";

        // Upload encrypted file to Supabase Storage
        const storagePath = await uploadEncryptedPaper(
          encryptedFileName,
          encryptedData
        );

        // Save metadata into PostgreSQL
        const { error } = await supabase
          .from("question_papers")
          .insert({
            subject: meta.subject,
            department: meta.department,
            semester: meta.semester,
            exam_name: meta.exam_name,
            uploaded_by: user.id,
            encrypted_filename: encryptedFileName,
            encrypted_file_url: storagePath,
            hash,
            status: "Pending",
          });

        if (error) throw error;

        // Create audit log
        await createAuditLog(
          user.id,
          "UPLOAD",
          `Uploaded ${file.name}`
        );

        resolve({
          success: true,
          hash,
          storagePath,
        });
      } catch (err) {
        reject(err);
      }
    };

    reader.readAsDataURL(file);
  });
}