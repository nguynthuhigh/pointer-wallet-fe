import axios from "axios";
import Cookies from "universal-cookie";
const cookie = new Cookies()
export const getProfilePartner =async ()=>{
    return await axios.get(process.env.REACT_APP_LOCAL_HOST+'/api/v1/partner/dashboard',{
        headers:{
            Authorization: 'Bearer '+cookie.get('token_auth')
        }
    })
}
export const updateProfilePartner =async (body)=>{
    return await axios.put(process.env.REACT_APP_LOCAL_HOST+'/api/v1/partner/update-profile',body,{
        headers:{
            Authorization: 'Bearer '+cookie.get('token_auth')
        }
    })
  
    
}
export const getTransactions = async(page,pagesize)=>{
    return await axios.get(process.env.REACT_APP_LOCAL_HOST+'/api/v1/partner/get-transactions?page='+page+'&pagesize='+pagesize,{
        headers:{
            Authorization: 'Bearer '+cookie.get('token_auth')
        }
    })

}
export const getVouchers = async()=>{
    return await axios.get(process.env.REACT_APP_LOCAL_HOST+`/api/v1/voucher/get-vouchers`,{
        headers:{
            Authorization: 'Bearer '+cookie.get('token_auth')
        }
    })
}
const exportObject = {
    getProfilePartner,
    updateProfilePartner,
    getTransactions,
    getVouchers
}
export default exportObject;