import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import HomePage from "./HomePage";

// Mock the ProductList component
vi.mock("../components/ProductList", () => ({
  default: () => (
    <div data-testid="mock-product-list">Product List Component</div>
  ),
}));

const mockStore = configureStore([]);

describe("HomePage Component", () => {
  let store;

  beforeEach(() => {
    // Create a basic store
    store = mockStore({
      products: {
        items: [],
        loading: false,
        error: null,
      },
      cart: {
        cartItems: [],
      },
      theme: {
        isDarkMode: false,
      },
    });
  });

  it("should render with correct layout and styling", () => {
    const { container } = render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    // Check if the container has the correct classes
    const mainContainer = container.firstChild;
    expect(mainContainer.className).toContain("container");
    expect(mainContainer.className).toContain("mx-auto");
  });

  it("should render the heading with correct text and styling", () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    // Check the heading text and styling
    const heading = screen.getByText("Products");
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H2");
    expect(heading.className).toContain("text-3xl");
    expect(heading.className).toContain("font-bold");
    expect(heading.className).toContain("p-6");
  });

  it("should render the ProductList component", () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    // Check if the ProductList component is rendered
    expect(screen.getByTestId("mock-product-list")).toBeInTheDocument();
  });
});
