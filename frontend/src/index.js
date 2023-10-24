import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// import App from './App';
import Header from "./components/Header";
import SideBar from "./components/SideBar";

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Poppins"
/>;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Header />
    <SideBar />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
