import BookDesc from "@/components/book/book-desc";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Book Desc Component", () => {
	it("should display full description if it is short", () => {
		const shortDesc = "This is a short description";
		render(<BookDesc desc={shortDesc} />);
		expect(screen.getByText(shortDesc)).toBeInTheDocument();
		expect(screen.queryByText("Read More")).not.toBeInTheDocument();
	});

	it("should truncate long descriptions and show 'Read More' button", () => {
		const longDesc = "A".repeat(300);
		render(<BookDesc desc={longDesc} />);
		expect(screen.getByText(/AAA.../)).toBeInTheDocument();
		expect(screen.getByText("Read More")).toBeInTheDocument();
	});

	it("should expand and show full description when 'Read More' is clicked", () => {
		const longDesc = "A".repeat(300);
		render(<BookDesc desc={longDesc} />);
		fireEvent.click(screen.getByText("Read More"));
		expect(screen.getByText(longDesc)).toBeInTheDocument();
		expect(screen.getByText("Read Less")).toBeInTheDocument();
	});

	it("should collapse description when 'Read Less' is clicked", () => {
		const longDesc = "A".repeat(300);
		render(<BookDesc desc={longDesc} />);
		fireEvent.click(screen.getByText("Read More"));
		fireEvent.click(screen.getByText("Read Less"));
		expect(screen.getByText(/AAA.../)).toBeInTheDocument();
		expect(screen.getByText("Read More")).toBeInTheDocument();
	});
});
