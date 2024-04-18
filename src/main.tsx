import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RootRouter from "./router/index.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RootRouter />
  </React.StrictMode>,
);
