import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//import LoginPage from "./pages/LoginPage";
import { AuthContextProvider } from "./context/AuthContext";

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Poppins"
/>;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
