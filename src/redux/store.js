// 📌 Import các công cụ cần thiết từ Redux
import { legacy_createStore as createStore, applyMiddleware, compose } from "redux"; 

// 📌 Import redux-thunk (sử dụng named export)
import { thunk } from "redux-thunk"; 

// 📌 Import rootReducer - nơi chứa tất cả reducers của ứng dụng
import rootReducer from "./reducer/rootReducer"; 

// 📌 Import Redux Persist để lưu Redux state vào localStorage
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 📌 Mặc định lưu vào localStorage

// 📌 Cấu hình Redux Persist
const persistConfig = {
    key: 'root', // 🔹 Định danh của store trong localStorage
    storage,     // 🔹 Chọn nơi lưu trữ (ở đây là localStorage)
};

// 📌 Tạo persistedReducer - kết hợp Redux Persist với rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 📌 Kích hoạt Redux DevTools nếu có, nếu không thì dùng `compose` mặc định của Redux
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 📌 Tạo Redux Store
const store = createStore(
    persistedReducer,         // 🔹 Sử dụng persistedReducer để lưu state vào localStorage
    composeEnhancers(         // 🔹 Kết hợp Middleware và DevTools
        applyMiddleware(thunk) // 🔹 Kích hoạt redux-thunk để hỗ trợ async actions
    )
);

// 📌 Tạo persistor để theo dõi trạng thái lưu trữ của Redux Persist
const persistor = persistStore(store);

// 📌 Export `store` và `persistor` để dùng trong ứng dụng
export { store, persistor };
