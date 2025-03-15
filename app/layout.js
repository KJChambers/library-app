import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
	title: "Book Chamber",
	description: "A library app created to store and edit book data",
	author: "Kieran Chambers",
	keywords: [
		"book",
		"chamber",
		"library",
		"bookshelf",
		"reading",
		"book chamber",
		"book app",
		"library app",
		"libby",
		"openlibrary"
	],
	openGraph: {
		title: "Book Chamber",
		description: "A library app created to store and edit book data",
		url: "https://book-chamber.com",
		siteName: "Book Chamber",
		locale: "en_GB",
		type: "website"
	},
	twitter: {
		card: "summary",
		title: "Book Chamber",
		description: "A library app created to store and edit book data"
	}
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<script
					crossOrigin="anonymous"
					src="//unpkg.com/react-scan/dist/auto.global.js"
				/>
			</head>
			<body className="bg-slate-100 dark:bg-slate-800">
				{children}
				<Analytics />
			</body>
		</html>
	);
}
