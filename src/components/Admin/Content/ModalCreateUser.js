import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import axios from 'axios';  // ✅ Import axios đúng cách

const ModalCreateUser = (props) => {
    const { show, setShow } = props;

  
  // ham dong khi nhan nut close va nut x kh nhan dong du liru trong ham do se clear ve rong 
  const handleClose = () => {
    setShow(false);
    setEmail("")
    setPassword("")
    setUsername("")
    setRole("USER")
    setEmail("")
    setPreviewImage("")

  }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    // 📌 Hàm xử lý upload ảnh
    const handleUploadImage = (event) => {
        if (event.target && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
            console.log("Upload file:", event.target.files[0]);
        }
    }

    // 📌 Hàm gửi API tạo user
    const handSubmitCreateUser = async () => {
        try {
            const data = new FormData();  // ✅ Dùng FormData để gửi file
            data.append('email', email);
            data.append('password', password);
            data.append('username', username);
            data.append('role', role);
            data.append('userImage', image); // ✅ Không dùng chuỗi "image" mà dùng biến `image`

            // ✅ Gửi request lên server
            let res = await axios.post('http://localhost:8081/api/v1/participant', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log("Check res:", res);

            // Nếu thành công, đóng modal
            if (res.status === 200) {
                setShow(false);
            }
        } catch (error) {
            console.error("Lỗi khi gửi form:", error);
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control"
                                value={email} onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control"
                                value={password} onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control"
                                value={username} onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select id="inputState" className="form-select"
                                value={role} onChange={(event) => setRole(event.target.value)}
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>

                        <div className='col-md-12'>
                            <label className="form-label lable-upload" htmlFor='labelUpload'>
                                <FcPlus /> Upload File Image
                            </label>
                            <input type='file' id="labelUpload" onChange={handleUploadImage} />
                        </div>

                        <div className='col-md-12 img-preview'>
                            {previewImage ? <img src={previewImage} alt="Preview" /> : <span>Preview Image</span>}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handSubmitCreateUser}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateUser;
