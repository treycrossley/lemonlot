// src/App.test.tsx

import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import App from "../App";

// Mock the Home and NotFound components
vi.mock("../components/Home", () => ({
  __esModule: true,
  default: () => <div>Home Component</div>,
}));

vi.mock("../components/NotFound404", () => ({
  __esModule: true,
  default: () => <div>404 Not Found</div>,
}));

describe("App Routing", () => {
  it("renders the Home component when the path is '/'", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Assert that the Home component is rendered
    expect(screen.getByText("Home Component")).toBeInTheDocument();
  });

  it("renders the NotFound component for an unknown path", () => {
    // Mock the initial URL to simulate navigation to an unknown route
    window.history.pushState({}, "Test page", "/unknown-route");

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Assert that the NotFound component is rendered
    expect(screen.getByText("404 Not Found")).toBeInTheDocument();
  });
});
