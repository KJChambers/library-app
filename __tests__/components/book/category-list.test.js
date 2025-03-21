import CategoryList from "@/components/book/category-list";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));

describe("Category List Component", () => {
	const mockRouter = { refresh: jest.fn() };
	beforeEach(() => {
		useRouter.mockReturnValue(mockRouter);
	});

	const book = { _id: "1", categories: ["Fantasy", "Adventure"] };
	const user = { _id: "user1" };

	it("should render categories correctly", () => {
		render(<CategoryList book={book} user={user} />);
		expect(screen.getByText("Categories:")).toBeInTheDocument();
		expect(screen.getByText("Fantasy")).toBeInTheDocument();
		expect(screen.getByText("Adventure")).toBeInTheDocument();
	});

	it("should show loading state when updating categories", async () => {
		render(<CategoryList book={book} user={user} />);
		fireEvent.click(screen.getAllByRole("button", { name: "✕" })[0]);
		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it("should open the category selection modal when add button is clicked", () => {
		render(<CategoryList book={book} user={user} />);
		fireEvent.click(screen.getByTestId("open-modal"));
		expect(screen.getByText("Fiction")).toBeInTheDocument();
		expect(screen.getByText("Non-Fiction")).toBeInTheDocument();
	});

	it("should close the modal when the close button is clicked", async () => {
		render(<CategoryList book={book} user={user} />);
		fireEvent.click(screen.getByTestId("open-modal"));
		fireEvent.click(screen.getByRole("button", { name: "Close" }));
		await waitFor(() =>
			expect(screen.queryByText("Fiction")).not.toBeInTheDocument()
		);
	});
});
