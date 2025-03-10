import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ProductList from "./ProductList";
import { fetchProductsThunk } from "../redux/productsSlice";
import { addToCart } from "../redux/cartSlice";

vi.mock("../redux/productsSlice", () => ({
  fetchProductsThunk: vi.fn(),
}));

vi.mock("../redux/cartSlice", () => ({
  addToCart: vi.fn(),
}));

const mockStore = configureStore([]);

describe("ProductList Component", () => {
  let store;

  const mockProducts = [
    { id: 1, title: "Product 1", price: 19.99, image: "image1.jpg" },
    { id: 2, title: "Product 2", price: 29.99, image: "image2.jpg" },
  ];

  const mockCartItems = [{ id: 1, quantity: 2 }];

  beforeEach(() => {
    vi.clearAllMocks();
    store = mockStore({
      products: {
        items: mockProducts,
        loading: false,
        error: null,
      },
      cart: {
        cartItems: mockCartItems,
      },
      theme: {
        isDarkMode: false,
      },
    });

    store.dispatch = vi.fn();

    fetchProductsThunk.mockReturnValue({ type: "products/fetchProductsThunk" });
  });

  it("should render correctly with products", () => {
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    expect(screen.getByText("Products")).toBeInTheDocument();

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();

    expect(screen.getByText("$19.99")).toBeInTheDocument();
    expect(screen.getByText("$29.99")).toBeInTheDocument();

    expect(screen.getByText("In Cart: 2")).toBeInTheDocument();
  });

  it("should dispatch fetchProductsThunk on mount", () => {
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    expect(store.dispatch).toHaveBeenCalledWith({
      type: "products/fetchProductsThunk",
    });
  });

  it("should dispatch addToCart when Add to Cart button is clicked", () => {
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );
    const addToCartButtons = screen.getAllByText("Add to Cart");
    fireEvent.click(addToCartButtons[0]);
    expect(addToCart).toHaveBeenCalledWith(mockProducts[0]);
  });

  it("should show loading state", () => {
    const loadingStore = mockStore({
      products: {
        items: [],
        loading: true,
        error: null,
      },
      cart: { cartItems: [] },
      theme: { isDarkMode: false },
    });

    loadingStore.dispatch = vi.fn();

    render(
      <Provider store={loadingStore}>
        <ProductList />
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should show error state", () => {
    const errorStore = mockStore({
      products: {
        items: [],
        loading: false,
        error: "Failed to fetch products",
      },
      cart: { cartItems: [] },
      theme: { isDarkMode: false },
    });

    errorStore.dispatch = vi.fn();

    render(
      <Provider store={errorStore}>
        <ProductList />
      </Provider>
    );

    expect(screen.getByText("Failed to fetch products")).toBeInTheDocument();
  });

  it("should display message when no products are available", () => {
    const emptyStore = mockStore({
      products: {
        items: [],
        loading: false,
        error: null,
      },
      cart: { cartItems: [] },
      theme: { isDarkMode: false },
    });

    emptyStore.dispatch = vi.fn();

    render(
      <Provider store={emptyStore}>
        <ProductList />
      </Provider>
    );

    expect(screen.getByText("No products available.")).toBeInTheDocument();
  });

  it("should apply dark mode styles when isDarkMode is true", () => {
    const darkModeStore = mockStore({
      products: {
        items: mockProducts,
        loading: false,
        error: null,
      },
      cart: { cartItems: [] },
      theme: { isDarkMode: true },
    });

    darkModeStore.dispatch = vi.fn();

    const { container } = render(
      <Provider store={darkModeStore}>
        <ProductList />
      </Provider>
    );

    const mainContainer = container.firstChild;
    expect(mainContainer.className).toContain("bg-gray-900");
    expect(mainContainer.className).toContain("text-white");

    const productCards = container.querySelectorAll(".bg-gray-800");
    expect(productCards.length).toBe(2);
  });
});
