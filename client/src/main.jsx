import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import Router from "./config/router";
import "./assets/styles.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
      <Router />
  </BrowserRouter>
);
