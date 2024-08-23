

import Cookies from "universal-cookie";
import axiosConfig from '../../config/axios.config'
const cookie = new Cookies()
export const getProfileAPI = async()=>{
    return axiosConfig.get('/api/v1/user/profile',{
        withCredentials:true
    })
}


