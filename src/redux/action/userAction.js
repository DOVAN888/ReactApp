export const LOGIN = 'FETCH_LOGIN_SUCCESS';

// phan nay se duoc goi dispactch ben trang login o pha api 
export const doLogin = (data) => {
    // cai tai va play load nay lay tu ham login va no nam o ham goi api thanh cong de lay data 
    return {
         type: LOGIN,
         payload: data
    }
}
