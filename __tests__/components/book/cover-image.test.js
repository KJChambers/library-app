import CoverImage from "@/components/book/cover-image";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("next/image", () => ({
	__esModule: true,
	default: props => <img {...props} fill="true" priority="true" />
}));

describe("Cover Image Component", () => {
	const book = {
		ISBN: "1234567890",
		title: "Test Book",
		authors: "Test Author"
	};

	it("should render the book cover image when a valid ISBN is provided", () => {
		render(<CoverImage book={book} />);
		const image = screen.getByAltText("Test Book");
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute(
			"src",
			expect.stringContaining(book.ISBN)
		);
	});

	it("should show a placeholder when the image fails to load", () => {
		render(<CoverImage book={book} />);
		const image = screen.getByAltText("Test Book");
		fireEvent.error(image);
		expect(
			screen.getByText(
				`This book is missing a cover - add one at https://openlibrary.org/isbn/${book.ISBN}`
			)
		).toBeInTheDocument();
		expect(screen.getByText("Test Book")).toBeInTheDocument();
		expect(screen.getByText("Test Author")).toBeInTheDocument();
	});
});
