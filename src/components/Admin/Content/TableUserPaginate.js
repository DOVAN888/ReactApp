import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from 'react';
//import ReactDOM from 'react-dom';



const TableUserPaginate = (props) => {
    const { listUsers,fetchListUsersWithPaginate,pageCount } = props
     

    const handlePageClick = (event) => {
    fetchListUsersWithPaginate(+event.selected+1)
    
    console.log(
      `User requested page number ${event.selected}`
    );
    
  };


    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                       <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{item.id}</th>
                                <td>{item.username || "N/A"}</td>
                                <td>{item.email || "N/A"}</td>
                                <td>{item.role || "N/A"}</td>
                                <td className="d-flex gap-2">
                                    <button className="btn btn-secondary">View</button>
                                    <button className="btn btn-warning " onClick={()=>props.handeClickBtnUpdate(item)}>
                                        Update
                                    </button>
                                    <button className="btn btn-danger" onClick={()=>props.handleClickBtnDelete(item)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                    {listUsers && listUsers.length === 0 &&
                        
                        <tr>
                         <td colSpan="4" style={{ textAlign: "center", fontWeight: "bold", padding: "10px" }}>
                                Not found data
                            </td>
                        </tr>
                    }
                </tbody>
            </table>


            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                
                // Thêm class CSS để không cần viết thêm CSS
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
            />

    </>
           
       
    );
};

export default TableUserPaginate;
