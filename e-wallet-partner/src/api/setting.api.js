import axiosConfig from "../configs/axios.config";
export const updateProfile =async (formData)=>{
    return await axiosConfig.put(process.env.REACT_APP_API+'/api/v1/partner/update-profile',formData,{
        withCredentials:true
    })
}
export const updateSecurityCode =async (formData)=>{
    return await axiosConfig.put(process.env.REACT_APP_API+'/api/v1/partner/update-security-code',formData,{
        withCredentials:true
    })
}
