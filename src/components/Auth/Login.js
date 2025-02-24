import { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import { postLogin } from '../../services/apiServices'
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux'
import { doLogin } from '../../redux/action/userAction';
import { ImSpinner10 } from "react-icons/im";
const Login = (props) => {
      
    const[email,setEmail] = useState("")
    const [password, setPassword] = useState("")
      const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleLogin = async() => {
        // validate

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
          // 📌 Kiểm tra mật khẩu hợp lệ
    if (!validatePassword(password)) {
        toast.error("Password must be at least 6 characters!");
        return;
    }

   

        //  submit api
        
        try {

              if (!validateEmail(email)) {
            toast.error('Invalid email!');
            return;
        }

        if (!validatePassword(password)) {
            toast.error('Password must be at least 6 characters!');
            return;
        }
            setIsLoading(true)// set lai gia tri sau khi goi api xong 
            //goi api
           let data = await postLogin(email, password)
          
            if (data && data.EC === 0) {
                // dispatch de goi du lieu vao user redux 
                dispatch(doLogin(data))
              

                toast.success("success");
                  setIsLoading(false)
                navigate('/')
           
            } else {
                toast.error("Unexpected API response");
               setIsLoading(false); // ✅ Đảm bảo isLoading sẽ về false sau khi xử lý xong
            }
        } catch (error) {
            console.error("Error when submitting form:", error);
            toast.error("Something went wrong, please try again!");
        }
    }
   
    return (
        <div className="login-container">
            <div className='header'>
                <span>don't have an account yet?</span>
                <button onClick={()=>navigate('/register')}>Sign up</button>
            </div>
            <div className='title col-4 mx-auto'> Van Tuong JAPAN</div>
            <div className='welcome col-4 mx-auto'>hello who's this?  </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <lable>Email</lable>
                    <input
                        type={"email"}
                        className='form-control'
                        value={email}
                        onChange={(event)=>setEmail(event.target.value)}
                    />
                </div>
                 <div className='form-group'>
                    <lable>PassWord</lable>
                    <input
                        type={"password"}
                        className='form-control'
                        value={password}
                        onChange={(event)=>setPassword(event.target.value)}
                    />
                </div>
                <span className='forgot-password'>Forgot password?</span>
                <button
                    className='btn-submit'
                    onClick={() => handleLogin()} 
                   disabled={isLoading}
                >
                   {isLoading===true && <ImSpinner10 className='loader-icon'/>}
                <span>Login</span>
                </button>
            </div>
            <div>
                <span
                    className='back'
                    onClick={() => { navigate('/') }}> &#60; &#60; Go to Homepage</span>
            </div>
           
        </div>
    )
}
export default Login