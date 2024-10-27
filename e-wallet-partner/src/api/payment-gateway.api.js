import axios from "axios";
export const paymentSend =async (body)=>{
    return await axios.post(process.env.REACT_APP_API+'/api/v1/payment',body,{
        headers:{
            Authorization: 'Bearer pk_presspay_82fad953e33c472656094ab3b6a3d7d3553d3215ea09fda4e7d363caae555811'
        }
    })
}
export const PaymentGateway = async (token)=>{
    return await axios.get(process.env.REACT_APP_API+'/payment-gateway?token='+token)
}
export const paymentWithCard = async(body)=>{
    return await axios.post(process.env.REACT_APP_API+'/api/v1/payment-with-card',body)
}
const exportObject = {
    paymentSend,
    PaymentGateway,
    paymentWithCard
}
export default exportObject;