import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Playground from "./Playground.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Modules/Auth/Context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Playground />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
