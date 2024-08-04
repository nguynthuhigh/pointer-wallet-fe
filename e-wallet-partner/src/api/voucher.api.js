import axios from "axios";
import Cookies from "universal-cookie";
const cookie = new Cookies()
export const addVoucher = async(body)=>{
    const token = cookie.get('token_auth')
    return await axios.post(process.env.REACT_APP_LOCAL_HOST+`/api/v1/voucher/add-voucher`,body,{
        headers:{
            Authorization: 'Bearer '+token
        }
    })
}
export const getVoucher = async(voucherID)=>{
    const token = cookie.get('token_auth')
    return await axios.get(process.env.REACT_APP_LOCAL_HOST+`/api/v1/voucher/get-voucher?voucherID=`+voucherID,{
        headers:{
            Authorization: 'Bearer '+token
        }
    })
}
export const editVoucher = async(body)=>{
    const token = cookie.get('token_auth')
    return await axios.put(process.env.REACT_APP_LOCAL_HOST+`/api/v1/voucher/edit-voucher`,body,{
        headers:{
            Authorization: 'Bearer '+token
        }
    })
}
export const deleteVoucher = async (voucherID) => {
    const token = cookie.get('token_auth');
    console.log(voucherID);
    return await axios.delete(
      `${process.env.REACT_APP_LOCAL_HOST}/api/v1/voucher/delete-voucher`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        data:{voucherID:voucherID},
      }
    );
  };
const exportObject = {
    addVoucher,
    getVoucher,
    editVoucher,
    deleteVoucher
}
export default exportObject;