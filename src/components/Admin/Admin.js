import SideBar from "./SideBar";
import { FaBars } from 'react-icons/fa';
import './Admin.scss';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admin = (props) => {
    const  [collapsed,setCollapsed] = useState(false)
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                     <FaBars onClick={()=>setCollapsed(!collapsed)}/>
                </div>

                <div className="admin-main">
                    <Outlet/>
                </div>
                 
            </div>
           
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
        </div>
    )
}
export default Admin; 


// Khi nào dùng <Outlet />?
// ✔ Khi bạn có một bố cục chung (Layout) và muốn hiển thị nội dung động bên trong.
// ✔ Khi bạn muốn tạo Nested Routes (Route lồng nhau).
//   {/* Outlet/ // dong nay de nhan vao ttrang nao thi trang do se hien ra ma ko can load lai trang  */}

