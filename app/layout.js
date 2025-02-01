import Header from "@/components/header";
import "./globals.css";

export const metadata = {
  title: "Library App",
  description: "A Library app created to store and edit book data",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-100 dark:bg-slate-800">
        <Header />
        {children}
      </body>
    </html>
  );
}
