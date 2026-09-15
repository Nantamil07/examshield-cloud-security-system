import "./globals.css";

export const metadata = {
  title: "ExamShield Cloud",
  description: "Secure Cloud Question Paper Management System"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
