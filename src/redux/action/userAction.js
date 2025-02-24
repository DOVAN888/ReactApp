export const LOGIN = 'FETCH_LOGIN_SUCCESS';

// phan nay se duoc goi dispactch ben trang login o pha api 
export const doLogin = (data) => {
    return {
         type: LOGIN,
         payload: data
    }
}
