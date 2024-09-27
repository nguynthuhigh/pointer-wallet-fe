import React, { useState } from 'react';
import { Loading } from '../../components/auth/loading';
import voucherAPI from '../../api/voucher.api'
import { useNavigate ,useLocation} from 'react-router-dom';
import InputVoucher from '../../components/voucher/input_voucher';
import HeaderDashboard from '../../components/header/header_dashboard';
import SideBar from '../../components/dashboard/sidebar';
import { useQuery,useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
const initialData = {
    title: '',
    code: '',
    content: '',
    quantity: '',
    discountValue: '',
    type: 'discount_amount',
    min_condition: '',
  };
export default function EditVoucher() {
    const navigate = useNavigate()
    const [voucherData, setVoucherData] = useState(initialData);
    const [image, setImage] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [errorSubmit,setErrorSubmit] = useState(null)
    const handleChange = (name, value) => {
        if(name === 'image'){
          setImage(value)
        }
        setVoucherData({ ...voucherData, [name]: value });
        setErrors({discountValue:null,code:null})
    };
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const {data,isLoading} = useQuery({
      queryFn:async()=>{
        const data = await voucherAPI.getVoucher(id)
        return data.data
      },
      queryKey:['voucher',id]
    })
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
  const {isPending,mutate} = useMutation({
    mutationFn:async(formData)=>{
      console.log(formData)
      await voucherAPI.editVoucher(formData)
    },
    onSuccess:()=>{
      toast.success('Added Successfully!')
      navigate('/vouchers')
    },
    onError:(error)=>{
      toast.error(error.response.data.message)
    }
  })
  const handleSubmit =async (e) => {
    e.preventDefault();
    if(validate() === false){
        return
    }
    const formData =new FormData()
    formData.append('title',voucherData.title)
    formData.append('code',voucherData.code)
    formData.append('content',voucherData.content)
    formData.append('quantity',voucherData.quantity)
    formData.append('discountValue',voucherData.discountValue)
    formData.append('type',voucherData.type)
    formData.append('currency',voucherData.currency)
    formData.append('min_condition',voucherData.min_condition)
    formData.append('voucherID',id)
    console.log(image)
    formData.append('image',image)
    mutate(formData)
  };
  return (
    <div className='flex'>
    <SideBar state='Vouchers'></SideBar>
    {isLoading ? 'Loading...' : 
    <form className="p-5 w-full mx-auto bg-white shadow rounded-[15px]" onSubmit={handleSubmit}>
      <HeaderDashboard title="Edit Voucher"></HeaderDashboard>
      <div className="mb-5 grid grid-cols-2 gap-4">
        <InputVoucher placeholder="Discount 10% when payment with pressPay" name="Title" value={data.data.title} onChange={(e) => handleChange('title', e.target.value)}/>
        <InputVoucher error={errors.code} placeholder="VOUCHER100K" name="Code" value={data.data.code} onChange={(e) => handleChange('code', e.target.value)}/>
      </div>
      <div className="mb-5 grid grid-cols-2 gap-4">
        <InputVoucher error={errors.content} placeholder="Descriptions voucher" name="Descriptions" value={data.data.content} onChange={(e) => handleChange('content', e.target.value)}/>
        <InputVoucher error={errors.quantity} placeholder="99" name="Quantity" value={data.data.quantity} onChange={(e) => handleChange('quantity', e.target.value)} type="number"/>
      </div>
      <div className="mb-5 grid grid-cols-2 gap-4">
      <InputVoucher error={errors.discountValue} placeholder="-99,000đ or -99%" name="Discount Value" value={data.data.discountValue} onChange={(e) => handleChange('discountValue', e.target.value)} type="number"/>
        <div>
          <label className="block text-lg font-semibold mb-2">Type</label>
          <select id="countries" onChange={(e) => handleChange('type', e.target.value)} value={data.data.type} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-g0 ">
            <option value="discount_amount" >Discount amount</option>
            <option value="discount_percent" >Percent discount</option>
          </select>
          {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
        </div>
      </div>
      <div className="mb-5 grid grid-cols-2 gap-4">
        <InputVoucher error={errors.min_condition} placeholder="120,000..." name="Discount Value" value={data.data.min_condition} onChange={(e) => handleChange('min_condition', e.target.value)} type="number"/>
      </div>
      <div className='font-semibold text-center text-red-500'>{errorSubmit}</div>
      {!isLoading ? <button
        type="submit"
        className="w-full mt-4 py-4 bg-blue-700 text-white  font-semibold rounded-xl"
      >
        Add
      </button> :
      <button
        type="submit"
        className="w-full flex justify-center mt-4 py-4 bg-gray-300 text-white  font-semibold rounded-xl"
        disabled
      >
        <Loading/>
      </button>}
    </form>
    }
  </div>
  );
}

