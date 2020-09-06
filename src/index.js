import React from "react";
import ReactDOM from "react-dom";
import Router from "./router";
import configureStore from "./redux/store";
import { Provider } from "react-redux";
const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById("root")
);
