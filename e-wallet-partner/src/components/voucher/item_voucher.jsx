import React from 'react'
import { Link } from 'react-router-dom';

export const ItemVoucher = ({...props}) => {
  const data= props.data;
  return (
    <Link to={`/edit-voucher?id=${data._id}`} className='border rounded-xl duration-300 transition hover:-translate-y-1 hover:scale-110 cursor-pointer'>
        <img className='rounded-t-xl h-32 object-cover w-full' alt='' src={data.image ? data.image : 'https://www.eclosio.ong/wp-content/uploads/2018/08/default.png'}>
        </img>
        <div className='font-semibold p-4 space-y-2'>
            <h1 className='font-bold text-lg'>{data.code}</h1>
            <h1 className='max-h-12 text-gray-400 overflow-hidden text-ellipsis'>{data.title}</h1>
            <div className='flex justify-between  text-blue-500'>
                <h1>Quantity: {data.quantity + data.usedCount}</h1>
                <h1>Remaining: {data.quantity}</h1>
            </div>
            <h1 className='text-blue-500'>Min condition: 5,000đ</h1>
        </div>
    </Link>
  )
}
export const ItemVoucherLoading = () => {
  return (
    <div className='animate-pulse border rounded-xl '>
        <div className='rounded-t-xl h-32 bg-gray-200 w-full'></div>
        <div className='font-semibold p-4 space-y-2'>
           <div className='flex justify-between'>
            <div className='font-bold w-[45%] h-3 rounded-full bg-gray-200'></div>
            <div className='font-bold w-[45%] h-3 rounded-full bg-gray-200'></div>
           </div>
            <div className='flex justify-between  text-blue-500'>
                <div className='font-bold w-[45%] h-3 rounded-full bg-gray-200'></div>
                <div className='font-bold w-[45%] h-3 rounded-full bg-gray-200'></div>
            </div>
            <div className='font-bold w-[45%] h-3 rounded-full bg-gray-200'></div>
        </div>
    </div>
  )
}

 