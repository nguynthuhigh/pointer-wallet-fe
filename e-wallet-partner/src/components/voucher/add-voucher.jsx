import React, { useState } from 'react';
import Header from '../header/header_dashboard'
import { Loading } from '../auth/loading';
import voucherAPI from '../../api/voucher.api'
const initialData = {
  title: '',
  code: '',
  content: '',
  quantity: '',
  discountValue: '',
  type: 'discount_amount',
  min_condition: '',
};

export default function VoucherForm() {
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
            setMessage("Add successfully!")
            setIsLoading(false)
        }
    } catch (error) {
      console.log(error)
      setErrorSubmit(error.response.data.message)
      setIsLoading(false)
    }
  };

  return (
    <div>
        <Header></Header>
    <form className="p-5 max-w-[800px]  w-full mx-auto bg-white shadow rounded-[15px]" onSubmit={handleSubmit}>
      <div className='font-bold text-4xl my-2'>Add new voucher</div>
      <div className="mb-5 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-lg font-semibold mb-2">Title</label>
          <input
            className="w-full border border-gray-300 rounded-lg p-2 "
            value={voucherData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder='Discount 10% when payment with pressPay'
            required
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Code</label>
          <input
            className="w-full border border-gray-300 rounded-lg p-2 "
            value={voucherData.code}
            onChange={(e) => handleChange('code', e.target.value)}
            placeholder='VOUCHER100K'
            required
          />
          {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
        </div>
      </div>
      <div className="mb-5 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-lg font-semibold mb-2">Descriptions</label>
          <input
            className="w-full border border-gray-300 p-2 rounded-lg"
            value={voucherData.content}
            onChange={(e) => handleChange('content', e.target.value)}
            required
            placeholder='Descriptions voucher'

          />
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
        </div>
        <div>
          <label className="block text-lg font-semibold rounded-lg mb-2">Quantity</label>
          <input
            className="w-full border border-gray-300 p-2 rounded-lg"
            value={voucherData.quantity}
            onChange={(e) => handleChange('quantity', e.target.value)}
            type="number"
            required
            placeholder='99'
          />
          {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
        </div>
      </div>
      <div className="mb-5 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-lg font-semibold mb-2">Discount Value </label>
          <input
            className="w-full border border-gray-300 rounded-lg p-2 "
            value={voucherData.discountValue}
            onChange={(e) => handleChange('discountValue', e.target.value)}
            type="number"
            placeholder="-99,000đ or -99%"
            required
          />
          {errors.discountValue && <p className="text-red-500 text-sm mt-1">{errors.discountValue}</p>}
        </div>
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
        <div>
          <label className="block text-lg font-semibold mb-2">Min Condition</label>
          <input
            className="w-full border border-gray-300 p-2 rounded-lg"
            value={voucherData.min_condition}
            onChange={(e) => handleChange('min_condition', e.target.value)}
            type="number"
            placeholder="120,000..."
            required
          />
          {errors.min_condition && <p className="text-red-500 text-sm mt-1">{errors.min_condition}</p>}
        </div>
      </div>
      <div className='font-semibold text-center text-red-500'>{errorSubmit}</div>
      <div className='font-semibold text-center text-green-500'>{message}</div>

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
    </div>
       
  
  );
}
