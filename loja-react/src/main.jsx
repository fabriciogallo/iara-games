import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
// o CSS da plataforma é o mesmo das páginas estáticas: a loja em React herda a identidade visual sem copiar nada
import "../../assets/styles/index.css";
import "./styles/loja-react.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
