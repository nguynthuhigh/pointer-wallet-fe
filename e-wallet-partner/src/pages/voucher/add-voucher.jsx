import React, { useState } from 'react';
import { Loading } from '../../components/auth/loading';
import voucherAPI from '../../api/voucher.api'
import InputVoucher from '../../components/voucher/input_voucher';
import SideBar from '../../components/dashboard/sidebar';
import HeaderDashboard from '../../components/header/header_dashboard';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
const initialData = {
  title: '',
  code: '',
  content: '',
  quantity: '',
  discountValue: '',
  type: 'discount_amount',
  min_condition: 0,
  currency: ''
}
export default function VoucherForm() {
  const navigate = useNavigate()
  const [voucherData, setVoucherData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [errorSubmit,setErrorSubmit] = useState(null)
  const [isLoading,setIsLoading] = useState(false)
  const [message,setMessage] = useState(false)
  const handleChange = (name, value) => {
    setVoucherData({ ...voucherData, [name]: value });
    setErrors({discountValue:null,code:null})
  };

  const validate = () => {
    let tempErrors = {};
    if (voucherData.discountValue > 100 && voucherData.type === "discount_percent"){
      tempErrors.discountValue = "Discount value is less than or equal to more than 100";
      setErrors(tempErrors);
      return false
    } 
    if (voucherData.discountValue < 1 ) {
      tempErrors.discountValue = "Discount value must be more than 1";
      setErrors(tempErrors);
      return false
    }
    if(voucherData.code.indexOf(' ') >= 0  )  {
      tempErrors.code="Invalid Code Voucher"
      setErrors(tempErrors);
      return false
    }
    if(voucherData?.quantity < 1 )  {
      tempErrors.quantity="Quantity must be more than 1"
      setErrors(tempErrors);
      return false
    }
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
        if(validate() === false){
          return
        }
        setIsLoading(true)
        const response = await voucherAPI.addVoucher(voucherData)
        if(response.status === 200){
            toast.success("Add successfully!")
            setIsLoading(false)
            navigate('/vouchers')
        }
    } catch (error) {
      toast.error(error.response.data.message)
      setIsLoading(false)
    }
  };

  return (
    <div className='flex'>
      <Toaster position='top-right'></Toaster>
      <SideBar state='Vouchers'></SideBar>
      
      <form className="p-5 w-full mx-auto bg-white shadow rounded-[15px]" onSubmit={handleSubmit}>
        <HeaderDashboard title="Add new voucher"></HeaderDashboard>
        <div className="mb-5 grid grid-cols-2 gap-4">
          <InputVoucher placeholder="Discount 10% when payment with pressPay" name="Title" value={voucherData.title} onChange={(e) => handleChange('title', e.target.value)}/>
          <InputVoucher error={errors.code} placeholder="VOUCHER100K" name="Code" value={voucherData.code} onChange={(e) => handleChange('code', e.target.value)}/>
        </div>
        <div className="mb-5 grid grid-cols-2 gap-4">
          <InputVoucher error={errors.content} placeholder="Descriptions voucher" name="Descriptions" value={voucherData.content} onChange={(e) => handleChange('content', e.target.value)}/>
          <InputVoucher error={errors.quantity} placeholder="99" name="Quantity" value={voucherData.quantity} onChange={(e) => handleChange('quantity', e.target.value)} type="number"/>
        </div>
        <div className="mb-5 grid grid-cols-2 gap-4">
        <InputVoucher error={errors.discountValue} placeholder="-99,000đ or -99%" name="Discount Value" value={voucherData.discountValue} onChange={(e) => handleChange('discountValue', e.target.value)} type="number"/>
          <div>
            <label className="block text-lg font-semibold mb-2">Type</label>
            <select id="countries" onChange={(e) => handleChange('type', e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-g0 ">
              <option value="discount_amount" >Discount amount</option>
              <option value="discount_percent" >Percent discount</option>
            </select>
            {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
          </div>
        </div>
        <div className="mb-5 grid grid-cols-2 gap-4">
          <InputVoucher error={errors.min_condition} placeholder="120,000..." name="Min condition" value={voucherData.min_condition} onChange={(e) => handleChange('min_condition', e.target.value)} type="number"/>
          <InputVoucher error={errors.currency} placeholder="VND, USD, ETH" name="Currency" value={voucherData.currency} onChange={(e) => handleChange('currency', e.target.value)} type="text"/>
        </div>
        <div>
          <input required type='file'></input>
        </div>
        <div className='font-semibold text-center text-red-500'>{errorSubmit}</div>
        <div className='font-semibold text-center text-green-500'>{message}</div>
      <div className='flex justify-between'>
        <button className='w-[49%] mt-4 py-4 border-gray-400  text-gray-400 border-2 font-semibold rounded-xl'>Cancel</button>
      {!isLoading ? <button
          type="submit"
          className="w-[49%] mt-4 py-4 bg-blue-700 text-white  font-semibold rounded-xl"
        >
          Add
        </button> :
        <button
          type="submit"
          className="w-[49%] flex justify-center mt-4 py-4 bg-gray-300 text-white  font-semibold rounded-xl"
          disabled
        >
          <Loading/>
        </button>}
      </div>
      </form>
    </div>
  );
}
