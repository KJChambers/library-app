import Header from "@/components/header";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: "Book Chamber",
  description: "A Library app created to store and edit book data",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-100 dark:bg-slate-800">
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
