import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import UserPage from "./UserPage";
import { fetchUser } from "../redux/userSlice";

// Mock the redux userSlice
vi.mock("../redux/userSlice", () => ({
  fetchUser: vi.fn(() => ({ type: "user/fetchUser" })),
}));

const mockStore = configureStore([]);

describe("UserPage Component", () => {
  let store;

  // Sample user data for testing
  const mockUser = {
    name: {
      firstname: "John",
      lastname: "Doe",
    },
    email: "john.doe@example.com",
    address: {
      city: "New York",
      street: "123 Main St",
    },
  };

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
  });

  it("should render loading state correctly", () => {
    // Create store with loading state
    store = mockStore({
      user: {
        user: null,
        loading: true,
        error: null,
      },
      theme: {
        isDarkMode: false,
      },
    });

    store.dispatch = vi.fn();

    render(
      <Provider store={store}>
        <UserPage />
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(fetchUser).toHaveBeenCalled();
  });

  it("should render error state correctly", () => {
    // Create store with error state
    store = mockStore({
      user: {
        user: null,
        loading: false,
        error: "Failed to fetch user data",
      },
      theme: {
        isDarkMode: false,
      },
    });

    store.dispatch = vi.fn();

    render(
      <Provider store={store}>
        <UserPage />
      </Provider>
    );

    expect(screen.getByText("Failed to fetch user data")).toBeInTheDocument();
    expect(screen.getByText("Failed to fetch user data").className).toContain(
      "text-red-500"
    );
  });

  it("should render user data correctly", () => {
    // Create store with user data
    store = mockStore({
      user: {
        user: mockUser,
        loading: false,
        error: null,
      },
      theme: {
        isDarkMode: false,
      },
    });

    store.dispatch = vi.fn();

    render(
      <Provider store={store}>
        <UserPage />
      </Provider>
    );

    // Check if user name is displayed correctly
    expect(screen.getByText("John Doe")).toBeInTheDocument();

    // Check if user email is displayed
    expect(screen.getByText("📧 john.doe@example.com")).toBeInTheDocument();

    // Check if user address is displayed
    expect(screen.getByText("📍 New York, 123 Main St")).toBeInTheDocument();
  });

  it("should dispatch fetchUser on mount", () => {
    // Create basic store
    store = mockStore({
      user: {
        user: null,
        loading: false,
        error: null,
      },
      theme: {
        isDarkMode: false,
      },
    });

    store.dispatch = vi.fn();

    render(
      <Provider store={store}>
        <UserPage />
      </Provider>
    );

    // Check if fetchUser was dispatched
    expect(fetchUser).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({ type: "user/fetchUser" });
  });

  it("should apply dark mode styles when isDarkMode is true", () => {
    // Create store with dark mode enabled
    store = mockStore({
      user: {
        user: mockUser,
        loading: false,
        error: null,
      },
      theme: {
        isDarkMode: true,
      },
    });

    store.dispatch = vi.fn();

    const { container } = render(
      <Provider store={store}>
        <UserPage />
      </Provider>
    );

    // Check if container has dark mode classes
    const mainContainer = container.firstChild;
    expect(mainContainer.className).toContain("bg-gray-900");
    expect(mainContainer.className).toContain("text-white");

    // Check if user card has dark mode styling
    const userCard = container.querySelector(".bg-gray-800");
    expect(userCard).toBeInTheDocument();
  });
});
