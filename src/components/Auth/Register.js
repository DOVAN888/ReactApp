import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // Import icon mắt từ Lucide
import "./Register.scss";
import { postCreateRegister } from "../../services/apiServices";
import { toast } from "react-toastify";

// 📌 Hàm kiểm tra email hợp lệ
const validateEmail = (email) => {
    return Boolean(
        String(email)
            .toLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    );
};

// 📌 Kiểm tra mật khẩu hợp lệ
const validatePassword = (password) => {
    return password.length >= 6 && !/\s/.test(password);
};

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // 👀 Trạng thái ẩn/hiện mật khẩu

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRegister = async () => {
        // 📌 Kiểm tra username có bị trống không
        if (!username.trim()) {
            toast.error("Username cannot be empty!");
            return;
        }

        // 📌 Kiểm tra email hợp lệ
        if (!validateEmail(email)) {
            toast.error("Invalid email format!");
            return;
        }

        // 📌 Kiểm tra mật khẩu hợp lệ
        if (!validatePassword(password)) {
            toast.error("Password must be at least 6 characters and no spaces!");
            return;
        }

        // 📌 Kiểm tra mật khẩu nhập lại
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            // 📌 Gửi API tạo user
            let data = await postCreateRegister(email, password, username);

            console.log("Check API Response:", data);

            if (data && data.EC === 0) {
                toast.success("Registration successful!");

                // 📌 Chuyển hướng về trang đăng nhập sau khi đăng ký thành công
                navigate("/login");
            } else {
                toast.error(data.EM || "Unexpected API response");
            }
        } catch (error) {
            console.error("Error when submitting form:", error);
            toast.error("Something went wrong, please try again!");
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h2>Register</h2>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group password-field">
                    <label>Password</label>
                    <div className="input-container">
                        <input
                            type={showPassword ? "text" : "password"} // 👀 Hiện/ẩn mật khẩu
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="toggle-icon" onClick={togglePasswordVisibility}>
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </span>
                    </div>
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button onClick={handleRegister} className="btn-register">Sign Up</button>
                <p className="login-link">
                    Already have an account? <span onClick={() => navigate("/login")}>Login here</span>
                </p>
            </div>
        </div>
    );
};

export default Register;
