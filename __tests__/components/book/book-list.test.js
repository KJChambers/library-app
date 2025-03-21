import BookList from "@/components/book/book-list";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));

describe("Book List Component", () => {
	const mockRouter = { push: jest.fn() };
	beforeEach(() => {
		useRouter.mockReturnValue(mockRouter);
	});

	it("should return 'No books to show!' when the books array is empty", () => {
		render(<BookList books={[]} />);
		expect(screen.getByText("No books to show!")).toBeInTheDocument();
	});

	it("should render books correctly when books array is provided", () => {
		const books = [
			{
				_id: "1",
				ISBN: "123",
				title: "Book Title",
				authors: "Author Name",
				pub_date: "2023",
				publisher: "Publisher"
			}
		];
		render(<BookList books={books} />);
		expect(screen.getByText("Book Title")).toBeInTheDocument();
		expect(screen.getByText("Author Name")).toBeInTheDocument();
	});

	it("should show publisher and date when props are enabled", () => {
		const books = [
			{
				_id: "1",
				ISBN: "123",
				title: "Book Title",
				authors: "Author Name",
				pub_date: "2023",
				publisher: "Publisher"
			}
		];
		render(<BookList books={books} publisher={true} date={true} />);
		expect(screen.getByText("2023, Publisher")).toBeInTheDocument();
	});

	it("should handle book click and navigate correctly", () => {
		const books = [
			{
				_id: "1",
				ISBN: "123",
				title: "Book Title",
				authors: "Author Name"
			}
		];
		render(<BookList books={books} />);
		fireEvent.click(screen.getByText("Book Title"));
		expect(mockRouter.push).toHaveBeenCalledWith("/books/123");
	});

	it("should show more books when 'Show More' button is clicked", () => {
		const books = Array.from({ length: 10 }, (_, i) => ({
			_id: `${i}`,
			ISBN: `${i}`,
			title: `Book ${i}`,
			authors: "Author"
		}));
		render(<BookList books={books} />);
		const showMore = screen.getByText("Show More");
		expect(showMore).toBeInTheDocument();
		fireEvent.click(showMore);
	});
});
