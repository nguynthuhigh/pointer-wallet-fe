import React, { useState } from 'react';
import { Loading } from '../../components/auth/loading';
import voucherAPI from '../../api/voucher.api'
import InputVoucher from '../../components/voucher/input_voucher';
import SideBar from '../../components/dashboard/sidebar';
import HeaderDashboard from '../../components/header/header_dashboard';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import UploadFile from '../../components/dashboard_old/components/upload-file';
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
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState()
  const validate = () => {
    let tempErrors = {};
    if (voucherData.discountValue > 100 && voucherData.type === "discount_percent") {
      tempErrors.discountValue = "Discount value is less than or equal to more than 100";
      setErrors(tempErrors);
      return false
    }
    if (voucherData.discountValue < 1) {
      tempErrors.discountValue = "Discount value must be more than 1";
      setErrors(tempErrors);
      return false
    }
    if (voucherData.code.indexOf(' ') >= 0) {
      tempErrors.code = "Invalid Code Voucher"
      setErrors(tempErrors);
      return false
    }
    if (voucherData?.quantity < 1) {
      tempErrors.quantity = "Quantity must be more than 1"
      setErrors(tempErrors);
      return false
    }
  };
  const handleChange = (name, value) => {
    if (name === 'image') {
      setImage(value)
    }
    setVoucherData({ ...voucherData, [name]: value });
    setErrors({ discountValue: null, code: null })
  };
  const { mutate } = useMutation({
    mutationFn: async (formData) => {
      await voucherAPI.addVoucher(formData)
    },
    onSuccess: () => {
      toast.success('Added Successfully!')
      navigate('/vouchers')
    },
    onError: (error) => {
      toast.error(error.response.data.message)
    }
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate() === false) {
      return
    }
    const formData = new FormData()
    formData.append('title', voucherData.title)
    formData.append('code', voucherData.code)
    formData.append('content', voucherData.content)
    formData.append('quantity', voucherData.quantity)
    formData.append('discountValue', voucherData.discountValue)
    formData.append('type', voucherData.type)
    formData.append('currency', voucherData.currency)
    formData.append('min_condition', voucherData.min_condition)
    formData.append('image', image)
    console.log(...formData.entries())
    mutate(formData)
  };
  return (
    <div className='flex'>
      <Toaster position='top-right'></Toaster>
      <SideBar state='Vouchers'></SideBar>
      <form className="px-5 lg:w-[1000px] w-full space-y-[20px]" onSubmit={handleSubmit}>
        <HeaderDashboard title="Add new voucher"></HeaderDashboard>
        <div className=" grid grid-cols-2 gap-x-[30px]">
          <InputVoucher placeholder="Discount 10% when payment with pressPay" name="Title" value={voucherData.title} onChange={(e) => handleChange('title', e.target.value)} />
          <InputVoucher error={errors.code} placeholder="VOUCHER100K" name="Code" value={voucherData.code} onChange={(e) => handleChange('code', e.target.value)} />
        </div>
        <div className=" grid grid-cols-2 gap-x-[30px]">
          <InputVoucher error={errors.content} placeholder="Descriptions voucher" name="Descriptions" value={voucherData.content} onChange={(e) => handleChange('content', e.target.value)} />
          <InputVoucher error={errors.quantity} placeholder="99" name="Quantity" value={voucherData.quantity} onChange={(e) => handleChange('quantity', e.target.value)} type="number" />
        </div>
        <div className=" grid grid-cols-2 gap-x-[30px]">
          <InputVoucher error={errors.discountValue} placeholder="-99,000đ or -99%" name="Discount Value" value={voucherData.discountValue} onChange={(e) => handleChange('discountValue', e.target.value)} type="number" />
          <div className='space-y-[8px]'>
            <label className="block text-lg font-semibold">Type</label>
            <select id="countries" onChange={(e) => handleChange('type', e.target.value)} class="border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ">
              <option value="discount_amount" >Discount amount</option>
              <option value="discount_percent" >Percent discount</option>
            </select>
            {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
          </div>
        </div>
        <div className=" grid grid-cols-2 gap-x-[30px]">
          <InputVoucher error={errors.min_condition} placeholder="120,000..." name="Min condition" value={voucherData.min_condition} onChange={(e) => handleChange('min_condition', e.target.value)} type="number" />
          <InputVoucher error={errors.currency} placeholder="VND, USD, ETH" name="Currency" value={voucherData.currency} onChange={(e) => handleChange('currency', e.target.value)} type="text" />
        </div>
        <div>
          {/* <input onChange={(e) => handleChange('image', e.target.files[0])} required type='file'>
          </input> */}
          <UploadFile 
            image={image}
            setImage={setImage}  
          />
        </div>
        <div className='flex justify-between gap-x-[30px]'>
          <button className='w-full py-2 border-gray-300 text-gray-400 border-2 font-semibold rounded-[6px]'>Cancel</button>
          {!isLoading ? <button
            type="submit"
            className="w-full py-2 bg-blue-700 text-white font-semibold rounded-[6px]"
          >
            Add
          </button> :
            <button
              type="submit"
              className="w-full flex justify-center mt-4 py-4 bg-gray-300 text-white  font-semibold rounded-xl"
              disabled
            >
              <Loading />
            </button>}
        </div>
      </form>
    </div>
  );
}