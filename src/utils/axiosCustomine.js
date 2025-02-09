import axios from "axios";

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
