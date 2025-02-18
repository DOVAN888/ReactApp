import { legacy_createStore as createStore, applyMiddleware, compose } from "redux"; // ✅ Dùng `legacy_createStore`
// ✅ Import đúng createStore
import { thunk } from "redux-thunk"; // Middleware hỗ trợ async
import rootReducer from "./reducer/rootReducer"; // Import rootReducer

// 📌 Tích hợp Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 📌 Tạo store với Redux thường
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
