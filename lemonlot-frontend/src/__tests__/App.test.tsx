import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App"; // Adjust the import path as necessary

describe("App Component", () => {
  test("renders the heading", () => {
    render(<App />);
    const headingElement = screen.getByText(/vite \+ react/i);
    expect(headingElement).toBeInTheDocument();
  });

  test("button click updates count", () => {
    render(<App />);
    const buttonElement = screen.getByRole("button", { name: /count is 0/i });
    fireEvent.click(buttonElement);
    expect(buttonElement).toHaveTextContent("count is 1");
  });
});
