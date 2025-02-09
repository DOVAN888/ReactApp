import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import reportWebVitals from "./reportWebVitals";
import HomePage from "./components/Home/HomePage";
import MangeUser from "./components/Admin/Content/MangeUser";
import DashBoard from "./components/Admin/Content/DashBoard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
           <Route index element={<HomePage />} />
           <Route path="users" element={<User />} />
          
        </Route>
        <Route path="/admins" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path="manage-users" element={<MangeUser />} />
          </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
