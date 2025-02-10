import { useState } from 'react';
import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { FcPlus } from "react-icons/fc";
//import TableUser from './TableUser';
import TableUserPaginate from './TableUserPaginate';
//ben duoi cat tu table user
import { useEffect} from "react";
//import axios from "axios";
import { getAllUsers } from "../../../services/apiServices";
//phan update user
import ModalUpdateUser from './ModalUpdateUser';
import ModalDeleteUser from './ModalDeleteUser';
import { getUserWithPaginate } from '../../../services/apiServices';

const MangeUser = (props) => {
    const LIMIT_USER = 6;// cai nay lay tu backend lien quan den phan trang
    const [pageCount, setPageCount] = useState(0);
    //cai nay de an hien khi nhan  ao nut x o create
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    //cai nay de an hien khi nhan  ao nut x o update
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
     // ham nay de lay lai data khi nhan vao update vi data von co la mot object nen phi viet nhu the nay ({})
    const [dataUpdate, setDataUpdate] = useState({})
    
    // data delete 
    const [dataDelete, setDataDelete] = useState({})
    
    // ham xoa 
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
    // ham nay lay dnah sach lisuser
    const [listUsers, setlistUsers] = useState([]);


    // ham nay lay du lieu user ra table 
    //useEffect ham nay se duoc chay sau khi ham render ben duoi no chay xong 
 // ham useEfect chinh bang ham componentdidmount cua class
    useEffect(() => {
        // fetchListUsers()
        fetchListUsersWithPaginate(1)
    }, []);
    // goi api getAllUsers() ben service
    const fetchListUsers = async () => {
        let res = await getAllUsers()
        if (res.EC === 0) {
            setlistUsers(res.DT)
            
        }
    }

    // getnguoi dung theo phan trang 
     const fetchListUsersWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page,LIMIT_USER)
        if (res.EC === 0) {
            setlistUsers(res.DT.users);
            setPageCount(res.DT.totalPages)
            
        }
    }

    // ham update user useupdate chinh bang item 
    const handeClickBtnUpdate = (userUpdate) => {
        setShowModalUpdateUser(true)
        setDataUpdate(userUpdate)
        //console.log(userUpdate)
    }
    // ham resetdata neu nhan vao mot id hai lan no van chay 
    const resetUpdateData = () => {
        setDataUpdate({})
    }

    // ham xoa du lieu handeClickBtnDelete
    const handleClickBtnDelete = (userDelete) => {
        //console.log(userDelete)
        setShowModalDeleteUser(true)
        setDataDelete(userDelete)
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
                    
                    {/* <TableUser
                        listUsers={listUsers} 
                        handeClickBtnUpdate={handeClickBtnUpdate}
                         handleClickBtnDelete={ handleClickBtnDelete}
                    /> */}
                    <TableUserPaginate 
                        listUsers={listUsers} 
                        handeClickBtnUpdate={handeClickBtnUpdate}
                         handleClickBtnDelete={ handleClickBtnDelete}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                     pageCount ={pageCount}
                    />
                </div>
                <ModalCreateUser 
                    show={showModalCreateUser} 
                    setShow={setShowModalCreateUser} 
                    fetchListUsers={fetchListUsers}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser} 
                    setShow={setShowModalUpdateUser} 
                    dataUpdate={dataUpdate}
                    fetchListUsers={fetchListUsers}
                    resetUpdateData={resetUpdateData}


                />
                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
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

