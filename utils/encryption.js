import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;

export function encryptPDF(data) {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
}

export function decryptPDF(cipherText) {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}