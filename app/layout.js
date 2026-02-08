import "./globals.css";

export const metadata = {
  title: "IELTS Reading Practice",
  description: "IELTS reading practice system with local progress tracking"
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
