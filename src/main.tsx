import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

(function () {
  const redirect = sessionStorage.redirect;
  if (redirect) {
    delete sessionStorage.redirect;
    history.replaceState(null, "", redirect);
  }
})();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
