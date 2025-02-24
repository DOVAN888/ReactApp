import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'nprogress/nprogress.css'
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import Layout from "./Layout";
import { store, persistor } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <React.StrictMode>
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
     <Layout/>
      </BrowserRouter>
      </PersistGate>
      </Provider>
  </React.StrictMode>
);

reportWebVitals();


// ✔ Redux Persist tự động khôi phục state từ localStorage hoặc sessionStorage.
// ✔ Chỉ hiển thị ứng dụng sau khi Redux Persist hoàn tất khôi phục dữ liệu.
// ✔ Có thể thêm component loading thay vì null để hiển thị trạng thái loading.
