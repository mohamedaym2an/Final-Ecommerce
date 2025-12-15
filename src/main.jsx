import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import StoreProvider from "./poviders/storeProvider.jsx";
import QueryProvider from "./poviders/queryClientProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StoreProvider>
      <QueryProvider>
        <App />
      </QueryProvider>
    </StoreProvider>
  </StrictMode>
);
