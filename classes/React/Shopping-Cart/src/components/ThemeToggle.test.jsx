import { configureStore } from "redux-mock-store";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "./ThemeToggle";
import { Provider } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";

const mockStore = configureStore();

let store;
const renderWithStore = (initialState) => {
  store = mockStore(initialState);
  store.dispatch = vi.fn();
  return render(
    <Provider store={store}>
      <ThemeToggle />
    </Provider>
  );
};

describe("ThemeToggle Component", () => {
  it("renders the moon icon when dark mode is on", () => {
    renderWithStore({ theme: { isDarkMode: true } });
    expect(screen.queryByTestId("sun-icon")).not.toBeInTheDocument();
    expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
  });

  it("render the sun icon when dark mode is off", () => {
    renderWithStore({ theme: { isDarkMode: false } });
    expect(screen.queryByTestId("moon-icon")).not.toBeInTheDocument();
    expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
  });

  it("disptaches toggleTheme action when icon is clicked", () => {
    renderWithStore({ theme: { isDarkMode: true } });
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(store.dispatch).toHaveBeenCalledWith(toggleTheme());
  });
});
