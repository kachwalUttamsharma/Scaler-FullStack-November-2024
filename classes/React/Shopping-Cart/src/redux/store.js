import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productsReducer from "./productsSlice";
import cartReducer from "./cartSlice";
import themeReducer from "./themeSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const cartPersistConfig = {
  key: "cart",
  storage: storage,
};

const themePersistConfig = {
  key: "theme",
  storage: storage,
};

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    cart: persistReducer(cartPersistConfig, cartReducer),
    theme: persistReducer(themePersistConfig, themeReducer),
  },
});

export default store;

export const persistor = persistStore(store);
