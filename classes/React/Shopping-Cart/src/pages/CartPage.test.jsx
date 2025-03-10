import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CartPage from "./CartPage";

// Mock the Cart component
vi.mock("../components/Cart", () => ({
  default: () => <div data-testid="mock-cart">Cart Component</div>,
}));

const mockStore = configureStore([]);

describe("CartPage Component", () => {
  let store;

  beforeEach(() => {
    // Create a basic store
    store = mockStore({
      cart: {
        cartItems: [],
      },
      theme: {
        isDarkMode: false,
      },
    });
  });

  it("should render correctly with proper styling", () => {
    const { container } = render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );

    // Check if the container has the correct classes
    const mainContainer = container.firstChild;
    expect(mainContainer.className).toContain("container");
    expect(mainContainer.className).toContain("mx-auto");
    expect(mainContainer.className).toContain("p-6");
  });

  it("should render the Cart component", () => {
    render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );

    // Check if the Cart component is rendered
    expect(screen.getByTestId("mock-cart")).toBeInTheDocument();
  });
});
