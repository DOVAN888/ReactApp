import axios from '../utils/axiosCustomine';


const postCreateNewUser = (email, password, username, role, image) => {
    //submit data 
    const data = new FormData();
                data.append('email', email);
                data.append('password', password);
                data.append('username', username);
                data.append('role', role);
                data.append('userImage', image);
   
 return axios.post('api/v1/participant', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

}


// ham api goi table vi la get nen don  gian la lay duong dan thoi chu ko can truyen data nhu ben tren 
// ham nau lay gia tri cua tunng id truoc khi update 
const getAllUsers = () => {
    return axios.get('api/v1/participant/all');
}
//ham update  day len dung ham put
const putUpdateNewUser = ( id,username, role, image) => {
    //submit data 
    const data = new FormData();
            
                data.append('id', id);
                data.append('username', username);
                data.append('role', role);
                data.append('userImage', image);
   
 return axios.put('api/v1/participant', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

}

export{postCreateNewUser,getAllUsers,putUpdateNewUser}