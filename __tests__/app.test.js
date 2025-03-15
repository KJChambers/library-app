import NotFoundPage from "@/app/not-found";
import { getByRole, render } from "@testing-library/react";

describe("Not Found Page", () => {
    it("renders a heading", () => {
        render(<NotFoundPage />);
        const heading = screen.getByRole("heading", { level: 1 });
        expect(heading).toBeInTheDocument();
    });
});