

const TableUser = (props) => {
    const{listUsers} = props

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
                                    <button className="btn btn-warning ">Update</button>
                                    <button className="btn btn-danger">Delete</button>
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
        </>
    );
};

export default TableUser;
