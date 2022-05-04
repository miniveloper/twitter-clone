import React from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle } from "styled-components";
import App from "./components/App";

const GlobalStyle = createGlobalStyle`

* {
  box-sizing: border-box;
}

input {
  all: unset;
  box-sizing: border-box;
  appearance: none;
}

body {
  background-color: black;
	font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: white;
	margin: 0;
}

button {
  background-color: white;
  color: black;
}

a {
  text-decoration: none;
  color: inherit;
}

form {
  width: 100%;
}
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
