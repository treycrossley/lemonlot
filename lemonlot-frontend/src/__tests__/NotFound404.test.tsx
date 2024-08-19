import { render, screen } from "@testing-library/react";
import NotFound from "../components/NotFound404"; // Adjust the path as necessary

describe("NotFound Component", () => {
  it("renders the correct message", () => {
    render(<NotFound />);

    // Assert that the correct message is rendered
    expect(screen.getByText("404 - Page Not Found")).toBeInTheDocument();
  });
});
