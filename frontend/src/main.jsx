import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { CardProvider } from "../context/CardContext";
import { CategoryProvider } from "../context/categoryContext";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CardProvider>
        <CategoryProvider>
          <App />
        </CategoryProvider>
      </CardProvider>
    </BrowserRouter>
  </StrictMode>
);
