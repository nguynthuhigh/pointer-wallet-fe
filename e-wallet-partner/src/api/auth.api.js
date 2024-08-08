import axios from "axios";

const signinAPI =async (body)=>{
    return await axios.post(process.env.REACT_APP_API+'/api/v1/partner/signin',body)
}
const signupAPI =async (body)=>{
    return await axios.post(process.env.REACT_APP_API +'/api/v1/partner/signup',body)
}
const verifySignupAPI =async (body)=>{
    return await axios.post(process.env.REACT_APP_API+'/api/v1/partner/verify',body)
}
const exportObject = {
    signinAPI,
    signupAPI,
    verifySignupAPI
}

export default exportObject