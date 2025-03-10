import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Cart from "./Cart";
import { removeFromCart, addToCart, reduceQuantity } from "../redux/cartSlice";

vi.mock("../redux/cartSlice", () => ({
  removeFromCart: vi.fn(() => ({ type: "cart/removeFromCart" })),
  addToCart: vi.fn(() => ({ type: "cart/addToCart" })),
  reduceQuantity: vi.fn(() => ({ type: "cart/reduceQuantity" })),
}));

const mockStore = configureStore([]);

describe("Cart Component", () => {
  let store;

  const mockCartItems = [
    {
      id: 1,
      title: "Test Product 1",
      price: 19.99,
      quantity: 2,
      image: "product1.jpg",
    },
    {
      id: 2,
      title: "Test Product 2",
      price: 29.99,
      quantity: 1,
      image: "product2.jpg",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    store = mockStore({
      cart: {
        cartItems: mockCartItems,
      },
      theme: {
        isDarkMode: false,
      },
    });

    store.dispatch = vi.fn();
  });

  it("should render cart items correctly", () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    expect(screen.getByText("Your Cart")).toBeInTheDocument();

    expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    expect(screen.getByText("Test Product 2")).toBeInTheDocument();

    expect(screen.getByText("$19.99")).toBeInTheDocument();
    expect(screen.getByText("$29.99")).toBeInTheDocument();

    const quantities = screen
      .getAllByText(/[0-9]+/)
      .map((el) => el.textContent);
    expect(quantities).toContain("2");
    expect(quantities).toContain("1");

    expect(screen.getByText("$69.97")).toBeInTheDocument();
  });

  it("should display empty cart message when no items", () => {
    const emptyStore = mockStore({
      cart: {
        cartItems: [],
      },
      theme: {
        isDarkMode: false,
      },
    });

    emptyStore.dispatch = vi.fn();

    render(
      <Provider store={emptyStore}>
        <Cart />
      </Provider>
    );

    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
    expect(screen.queryByText("Total:")).not.toBeInTheDocument();
  });

  it("should dispatch removeFromCart when Remove button is clicked", () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const removeButtons = screen.getAllByText("Remove");
    fireEvent.click(removeButtons[0]);

    expect(removeFromCart).toHaveBeenCalledWith(1);
    expect(store.dispatch).toHaveBeenCalled();
  });

  it("should dispatch addToCart when + button is clicked", () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const plusButtons = screen.getAllByText("+");
    fireEvent.click(plusButtons[0]);

    expect(addToCart).toHaveBeenCalledWith(mockCartItems[0]);
    expect(store.dispatch).toHaveBeenCalled();
  });

  it("should dispatch reduceQuantity when − button is clicked", () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const minusButtons = screen.getAllByText("−");
    fireEvent.click(minusButtons[0]);

    expect(reduceQuantity).toHaveBeenCalledWith({ id: 1 });
    expect(store.dispatch).toHaveBeenCalled();
  });

  it("should disable the − button when quantity is 1", () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const minusButtons = screen.getAllByText("−");

    expect(minusButtons[0]).not.toBeDisabled();

    expect(minusButtons[1]).toBeDisabled();

    expect(minusButtons[1].className).toContain("bg-gray-300");
    expect(minusButtons[1].className).toContain("cursor-not-allowed");
  });

  it("should apply dark mode styling when isDarkMode is true", () => {
    const darkModeStore = mockStore({
      cart: {
        cartItems: mockCartItems,
      },
      theme: {
        isDarkMode: true,
      },
    });

    darkModeStore.dispatch = vi.fn();

    const { container } = render(
      <Provider store={darkModeStore}>
        <Cart />
      </Provider>
    );

    const mainContainer = container.firstChild;
    expect(mainContainer.className).toContain("bg-gray-900");
    expect(mainContainer.className).toContain("text-white");
    const cartItems = container.querySelectorAll(".bg-gray-800");
    expect(cartItems.length).toBeGreaterThan(0);
  });

  it("should handle null or undefined cartItems gracefully", () => {
    const nullCartStore = mockStore({
      cart: {
        cartItems: null,
      },
      theme: {
        isDarkMode: false,
      },
    });

    nullCartStore.dispatch = vi.fn();

    render(
      <Provider store={nullCartStore}>
        <Cart />
      </Provider>
    );

    expect(screen.getByText("Your Cart")).toBeInTheDocument();
  });
});
