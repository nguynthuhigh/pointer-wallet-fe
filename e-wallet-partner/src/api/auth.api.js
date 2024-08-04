import axios from "axios";

const signinAPI =async (body)=>{
    return await axios.post(process.env.REACT_APP_API+'/api/v1/partner/signin',body)
}
const exportObject = {
    signinAPI
}

export default exportObject