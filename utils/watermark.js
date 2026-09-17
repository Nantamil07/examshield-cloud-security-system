import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";

export async function addWatermark(pdfBytes, userEmail) {

  const pdfDoc = await PDFDocument.load(pdfBytes);

  const pages = pdfDoc.getPages();

  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const currentTime = new Date().toLocaleString();

  pages.forEach((page) => {

    const { width, height } = page.getSize();

    page.drawText("CONFIDENTIAL", {
      x: width / 5,
      y: height / 2,
      size: 40,
      font,
      rotate: degrees(45),
      opacity: 0.15,
      color: rgb(1, 0, 0),
    });

    page.drawText(`Exam Center : ${userEmail}`, {
      x: 30,
      y: 40,
      size: 10,
      font,
      color: rgb(0.1, 0.1, 0.1),
    });

    page.drawText(`Downloaded : ${currentTime}`, {
      x: 30,
      y: 25,
      size: 10,
      font,
      color: rgb(0.1, 0.1, 0.1),
    });

  });

  return await pdfDoc.save();

}