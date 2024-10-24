import axiosInstance from "../configs/axios.config";
export const getProfilePartner =async ()=>{
    return await axiosInstance.get(process.env.REACT_APP_API+'/api/v1/partner/dashboard',{
        withCredentials:true
    })
}
export const updateProfilePartner =async (body)=>{
    return await axiosInstance.put(process.env.REACT_APP_API+'/api/v1/partner/update-profile',body,{
        withCredentials:true,
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
  
    
}
export const getTransactions = async(page,pagesize)=>{
    return await axiosInstance.get(process.env.REACT_APP_API+'/api/v1/partner/get-transactions?page='+page+'&pagesize='+pagesize,{
        withCredentials:true
    })

}
export const getVouchers = async()=>{
    return await axiosInstance.get(process.env.REACT_APP_API+`/api/v1/voucher/get-vouchers`,{
        withCredentials:true
    })
}
const exportObject = {
    getProfilePartner,
    updateProfilePartner,
    getTransactions,
    getVouchers
}
export default exportObject;