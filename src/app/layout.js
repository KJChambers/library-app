import MainHeader from "@/components/main-header";
import "./globals.css";

export const metadata = {
  title: "Library App",
  description: "A simple web app for readers to organise books, track reading progress, and analyse habits. Add books, update details, mark as read or unread, and view stats—all in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
