import CryptoJS from "crypto-js";

export function generateHash(data) {
  return CryptoJS.SHA256(data).toString();
}