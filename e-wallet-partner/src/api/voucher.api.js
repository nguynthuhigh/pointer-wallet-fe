import axios from "axios";
import axiosInstance from "../configs/axios.config";
export const addVoucher = async(formData)=>{
    return await axios.post(`${process.env.REACT_APP_API}/api/v1/voucher/add-voucher`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }
    }); 
}
export const getVoucher = async(voucherID)=>{
    return await axiosInstance.get(process.env.REACT_APP_API+`/api/v1/voucher/get-voucher-details?voucherID=`+voucherID,{
        withCredentials:true
    })
}
export const editVoucher = async(body)=>{
    return await axiosInstance.put(process.env.REACT_APP_API+`/api/v1/voucher/edit-voucher`,body,{
        withCredentials:true,
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}
export const deleteVoucher = async (voucherID) => {
    return await axiosInstance.delete(
      `${process.env.REACT_APP_API}/api/v1/voucher/delete-voucher`,
      {
        withCredentials:true,
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