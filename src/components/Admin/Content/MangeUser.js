import { useState } from 'react';
import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { FcPlus } from "react-icons/fc";
import TableUser from './TableUser';
//ben duoi cat tu table user
import { useEffect} from "react";
import axios from "axios";
import { getAllUsers } from "../../../services/apiServices";

const MangeUser = (props) => {
    // ✅ Đặt useState bên trong component
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);


    const [listUsers, setlistUsers] = useState([]);


    // ham nay lay du lieu user ra table 
    //useEffect ham nay se duoc chay sau khi ham render ben duoi no chay xong 
 // ham useEfect chinh bang ham componentdidmount cua class
    useEffect(() => {
        fetchListUsers()
    }, []);
    // goi api 
    const fetchListUsers = async () => {
        let res = await getAllUsers()
        if (res.EC === 0) {
            setlistUsers(res.DT)
            
        }
    }
    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>
            <div className="users-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={() => setShowModalCreateUser(true)}>
                        <FcPlus /> Add new users
                    </button>
                </div>
                <div className="table-users-container">
                    <TableUser listUsers={ listUsers} />
                </div>
                <ModalCreateUser 
                    show={showModalCreateUser} 
                    setShow={setShowModalCreateUser} 
                    fetchListUsers={fetchListUsers}
                />
            </div>
        </div>
    );
};

export default MangeUser;



// Modal trong React để làm gì?
// 🔹 Modal là một cửa sổ bật lên (popup) nằm trên trang web, giúp hiển thị thông tin quan trọng mà không cần chuyển trang.
// 🔹 Thường được dùng cho thông báo, xác nhận hành động, form nhập liệu, hiển thị chi tiết sản phẩm, v.v.

