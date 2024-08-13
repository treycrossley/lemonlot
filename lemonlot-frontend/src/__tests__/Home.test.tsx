import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../components/Home";

describe("Home Component", () => {
  test("renders the heading", () => {
    render(<Home />);
    const headingElement = screen.getByText(/vite \+ react/i);
    expect(headingElement).toBeInTheDocument();
  });

  test("button click updates count", () => {
    render(<Home />);
    const buttonElement = screen.getByRole("button", { name: /count is 0/i });
    fireEvent.click(buttonElement);
    expect(buttonElement).toHaveTextContent("count is 1");
  });
});
