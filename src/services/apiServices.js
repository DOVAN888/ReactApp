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


// ham api goi table vi la get nne doen gian la lay duong dan thoi chu ko can truyen data nhu ben tren 
const getAllUsers = () => {
    return axios.get('api/v1/participant/all');
}

export{postCreateNewUser,getAllUsers}