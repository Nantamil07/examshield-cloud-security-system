import "./globals.css";

export const metadata = {
  title: "ExamShield Cloud",
  description: "Secure Question Paper Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}