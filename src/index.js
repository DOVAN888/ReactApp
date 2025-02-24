import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'nprogress/nprogress.css'
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import Layout from "./Layout";
import store from "./redux/store";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <React.StrictMode>
     <Provider store={store}>
    <BrowserRouter>
     <Layout/>
      </BrowserRouter>
      </Provider>
  </React.StrictMode>
);

reportWebVitals();
