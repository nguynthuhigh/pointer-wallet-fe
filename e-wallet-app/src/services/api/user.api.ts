

import axios from "axios";
export const getProfileAPI = async(cookie:string)=>{
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/user/profile`,{
            headers:{
                Authorization: 'Bearer ' + cookie
            }
        });
      return response;
}
