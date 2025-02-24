import axios from "axios";
import NProgress from "nprogress";

NProgress.configure({
    showSpinner: false,
    // casing: 'ease',
    // speed: 500,
    // trickleRate: 0.5,
    // casing: 'ease',
    // speed: 200,
    // trickle: true,
    // trickleRate: 0.02,
    trickleSpeed: 100,
});


const instance = axios.create({
    baseURL: 'http://localhost:8081/', // URL gốc cho tất cả request
    timeout: 5000, // Thời gian timeout (5 giây để tránh lỗi timeout)
    // headers: {
    //     'X-Custom-Header': 'foobar' // Header tùy chỉnh
    // }
});

// 📌 Thêm request 
instance.interceptors.request.use(
    function (config) {
        NProgress.start();//dong nay goi thanh load ding khi go iapi

        console.log("📤 Request sent:", config);
        return config;
    },
    function (error) {
        console.error("❌ Request error:", error);
        return Promise.reject(error);
    }
);

// 📌 Thêm response interceptor no se lay thong tin cua response .data san roi nen ben modalcreateUser chi can lay tu data thoi
instance.interceptors.response.use(
    function (response) {
        NProgress.done();// dong nay loadding xong khi goi api

        console.log("📥 Response received:", response);
        return response && response.data ? response.data : response;
    },
    //no se dua ra thong bao loi tu server 
    function (error) {
        console.error("❌ Response error:", error.response);
        return error && error.response && error.response.data? error.response.data :Promise.reject(error);
    }
);


export default instance;


// 1️⃣ Request Interceptor

// Chạy trước khi gửi request → Bật loading (nProgress.start();) và ghi log request.
// Nếu request lỗi → Trả về lỗi ngay lập tức.
// 2️⃣ Response Interceptor

// Chạy sau khi nhận response → Tắt loading (nProgress.done();), ghi log response.
// Trả về response.data thay vì toàn bộ response để code gọn hơn.
// Nếu API lỗi → Trả về lỗi từ server (error.response.data).