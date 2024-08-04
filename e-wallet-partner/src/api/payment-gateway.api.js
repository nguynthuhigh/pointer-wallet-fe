import axios from "axios";
export const paymentSend =async (body)=>{
    return await axios.post(process.env.REACT_APP_LOCAL_HOST+'/api/v1/payment',body)
}
export const PaymentGateway =async (token)=>{
    return await axios.get(process.env.REACT_APP_LOCAL_HOST+'/payment-gateway?token='+token)
}
export const paymentWithCard = async(body)=>{
    return await axios.post(process.env.REACT_APP_LOCAL_HOST+'/api/v1/payment-with-card',body)
}
const exportObject = {
    paymentSend,
    PaymentGateway,
    paymentWithCard
}
export default exportObject;