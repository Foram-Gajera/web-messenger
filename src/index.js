import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase";
import { Provider } from "react-redux";
import store from "./store/Store";

const firebaseConfig = {
  apiKey: "AIzaSyDOMwvHLYcpA5m0p5V31fN9pigchXPCX8k",
  authDomain: "web-messenger-959fa.firebaseapp.com",
  projectId: "web-messenger-959fa",
  storageBucket: "web-messenger-959fa.appspot.com",
  messagingSenderId: "192835689788",
  appId: "1:192835689788:web:c6f7f5ebe92f25c0259239",
  measurementId: "G-Y0SYPZ5GER",
};

firebase.initializeApp(firebaseConfig);

//for testing here create a global variable to see each changes in the browser
window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
