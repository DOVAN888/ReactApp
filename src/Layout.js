import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import HomePage from "./components/Home/HomePage";
import MangeUser from "./components/Admin/Content/MangeUser";
import DashBoard from "./components/Admin/Content/DashBoard";
import Login from "./components/Auth/Login";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Auth/Register";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
//import ham lay duong dan 
import { useParams } from "react-router-dom";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";

//ham not found
const NotFound = () => {
    return (
        <div className="alert alert-danger container center">
           404: Not found data width yur Current URL 
        </div>
    )
}
const Layout = () => {
    return (
        <>
            <Routes>
                {/* //phan home */}
        <Route path="/" element={<App />}>
           <Route index element={<HomePage />} />
           <Route path="users" element={<ListQuiz/>} />
          
                </Route>
          <Route path="/quiz/:id" element={<DetailQuiz/>} />

        {/* //phan admin */}
        <Route path="/admins" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path="manage-users" element={<MangeUser />} />
          <Route path="manage-quizzes" element={<ManageQuiz />} />
        </Route>

    {/* phan login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound/>} />

            </Routes>
              
            <ToastContainer
            position="top-right"
            autoClose={5000}  // Tự động đóng sau 5 giây
            hideProgressBar={false} // Hiển thị thanh tiến trình
            newestOnTop={false} // Không ưu tiên toast mới lên trên cùng
            closeOnClick // Click vào sẽ đóng toast
            rtl={false} // Không bật chế độ từ phải sang trái
            pauseOnFocusLoss // Khi mất focus, toast sẽ tạm dừng
            draggable // Có thể kéo toast
            pauseOnHover // Dừng khi di chuột qua
        />

        </>
    )
}
export default Layout