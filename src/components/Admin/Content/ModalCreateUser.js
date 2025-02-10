import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { postCreateNewUser } from '../../../services/apiServices';

const ModalCreateUser = (props) => {
    const { show, setShow } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    // 📌 Đóng modal và reset dữ liệu
    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPassword("");
        setUsername("");
        setRole("USER");
        setPreviewImage("");
        setImage("");
    };

    // 📌 Xử lý upload ảnh
    const handleUploadImage = (event) => {
        if (event.target && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    };

    // 📌 Kiểm tra email hợp lệ
    const validateEmail = (email) => {
        return Boolean(String(email)
            .toLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/));
    };

    // 📌 Kiểm tra mật khẩu hợp lệ
    const validatePassword = (password) => {
        return password.length >= 6 && !/\s/.test(password);
    };

    // 📌 Gửi API tạo user
    const handSubmitCreateUser = async () => {
        if (!validateEmail(email)) {
            toast.error('Invalid email!');
            return;
        }

        if (!validatePassword(password)) {
            toast.error('Password must be at least 6 characters!');
            return;
        }

        if (!image) {
            toast.error("Please upload an image!");
            return;
        }

        try {
            let data = await postCreateNewUser(email, password, username, role, image);
            console.log("Check res:", data);

            if (data && data.EC===0) {
                toast.success("success");
              handleClose();
              await props.fetchListUsers();
            } else {
                toast.error("Unexpected API response");
            }
        } catch (error) {
            console.error("Error when submitting form:", error);
            toast.error("Something went wrong, please try again!");
        }
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" className='modal-add-user'>
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
                        <select className="form-select"
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
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handSubmitCreateUser}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalCreateUser;
