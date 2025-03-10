import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserThunk } from "../redux/userSlice";

const UserPage = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.user);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  useEffect(() => {
    dispatch(fetchUserThunk());
  }, []);

  return (
    <div
      className={`p-6 min-h-screen transition-colors ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">User Info</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {user && (
        <div
          className={`p-6 rounded-lg shadow-md max-w-md mx-auto transition ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white"
          }`}
        >
          <h3 className="text-lg font-semibold">
            {user.name.firstname} {user.name.lastname}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">📧 {user.email}</p>
          <p className="text-gray-600 dark:text-gray-300">
            📍 {user.address.city}, {user.address.street}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserPage;
