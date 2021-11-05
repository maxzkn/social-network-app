import "./index.css";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/redux-store";
import React from "react";
import ReactDOM from "react-dom";
import MyApp from "./App";

// let rerenderEntireTree = (store) => {
ReactDOM.render(
  // <React.StrictMode>
        <MyApp />,
  // </React.StrictMode>,
  document.getElementById("root")
);
// };

// rerenderEntireTree(store);

// store.subscribe(() => rerenderEntireTree(store));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
