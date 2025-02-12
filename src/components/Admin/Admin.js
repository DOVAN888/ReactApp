import SideBar from "./SideBar"; // Import Sidebar (Thanh điều hướng)
import { FaBars } from 'react-icons/fa'; // Import icon FaBars (Biểu tượng 3 dấu gạch ngang)
import './Admin.scss'; // Import file CSS để tạo giao diện
import { useState } from "react"; // Import useState để quản lý trạng thái
import { Outlet } from "react-router-dom"; // Import Outlet để hiển thị các Route con
import { ToastContainer } from "react-toastify"; // Import ToastContainer để hiển thị thông báo
import "react-toastify/dist/ReactToastify.css"; // Import CSS mặc định cho Toastify


const Admin = (props) => {
    const  [collapsed,setCollapsed] = useState(false)
    //collapsed là một state để kiểm soát Sidebar mở hoặc đóng.
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
        //📌 3.1 Sidebar (Thanh điều hướng bên trái)
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
        // Khi bấm vào biểu tượng FaBars, Sidebar sẽ đóng/mở (setCollapsed(!collapsed))
                     <FaBars onClick={()=>setCollapsed(!collapsed)}/>
                </div>

                <div className="admin-main">
            //  Dòng <Outlet/> sẽ được thay thế bằng nội dung tương ứng với route con.
            //  Ví dụ về cách hoạt động của <Outlet />:

            //  Khi route là /admin/dashboard, <Outlet /> sẽ hiển thị <Dashboard />.
            // Khi route là /admin/users, <Outlet /> sẽ hiển thị <UserManagement />.
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

