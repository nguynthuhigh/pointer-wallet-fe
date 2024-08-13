import axios from "axios";
import Cookies from "universal-cookie";
const cookie = new Cookies()
export const addWebhook =async (body)=>{
    console.log(body)
    return await axios.post(process.env.REACT_APP_API+'/api/v1/webhook/add-endpoint',body,{
        headers:{
            Authorization: 'Bearer '+cookie.get('token_auth')
        }
    })
}
export const deleteWebhook = async()=>{
    return await axios.delete(process.env.REACT_APP_API+'/api/v1/webhook/delete-endpoint',{
        headers:{
            Authorization: 'Bearer '+cookie.get('token_auth')
        }
    })
}
const exportObject = {
    addWebhook,
    deleteWebhook
}
export default exportObject;