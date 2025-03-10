import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, reduceQuantity, removeFromCart } from "../redux/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart?.cartItems);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const dispatch = useDispatch();

  const totalPrice = cartItems?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`p-6 min-h-screen transition-colors ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cartItems?.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems?.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between p-4 rounded-lg shadow-md transition ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-contain rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    ${item?.price?.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => dispatch(reduceQuantity({ id: item.id }))}
                  className={`px-3 py-1 rounded-md transition ${
                    item.quantity <= 1
                      ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                      : "bg-gray-500 hover:bg-gray-600 text-white"
                  }`}
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span className="text-lg">{item.quantity}</span>
                <button
                  onClick={() => dispatch(addToCart(item))}
                  className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
                >
                  +
                </button>
                <button
                  onClick={() => dispatch(removeFromCart({ id: item.id }))}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {cartItems?.length > 0 && (
            <div
              className={`p-4 mt-4 text-lg font-semibold rounded-lg shadow-md transition ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <p className="flex justify-between">
                Total:
                <span className="text-green-500">
                  ${totalPrice?.toFixed(2)}
                </span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
