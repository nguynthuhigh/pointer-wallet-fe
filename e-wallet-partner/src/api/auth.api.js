import axios from "axios";
import axiosConfig from "../configs/axios.config";
const signinAPI =async (body)=>{
    return await axiosConfig.post(process.env.REACT_APP_API+'/api/v1/partner/signin',body,{
        withCredentials:true
    })
}
const signupAPI =async (body)=>{
    return await axiosConfig.post(process.env.REACT_APP_API +'/api/v1/partner/signup',body,{
        withCredentials:true
    })
}
const verifySignupAPI =async (body)=>{
    return await axiosConfig.post(process.env.REACT_APP_API+'/api/v1/partner/verify',body,{
        withCredentials:true
    })
}
const exportObject = {
    signinAPI,
    signupAPI,
    verifySignupAPI
}

export default exportObject