import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition"
    >
      {!isDarkMode ? (
        <Sun data-testid="sun-icon" className="h-6 w-6 text-yellow-400" />
      ) : (
        <Moon
          data-testid="moon-icon"
          className="h-6 w-6 text-gray-800 dark:text-white"
        />
      )}
    </button>
  );
};

export default ThemeToggle;
