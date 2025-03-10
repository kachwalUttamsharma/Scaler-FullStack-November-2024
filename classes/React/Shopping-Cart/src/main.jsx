import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate
      loading={<div>From PersistGate Loader</div>}
      persistor={persistor}
    >
      <App />
    </PersistGate>
  </Provider>
);
