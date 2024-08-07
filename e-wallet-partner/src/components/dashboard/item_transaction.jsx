import React from 'react'
import fomart from '../../utils/format'
const AmountStyle =({data})=>{
    console.log(data)
    if(data.type === 'payment'){
        return <span className='text-green-500'>+{fomart.formatCurrency(data.amount,'VND')}</span>
    }
    if(data.type === 'refund'){
        return <span className='text-red-500'>-{fomart.formatCurrency(data.amount,'VND')}</span>
    }
}
const StatusStyle = ({data})=>{
    console.log(data.status)
    if(data.status === 'completed' || data.status === 'refunded'){
        return <span className='ml-2 rounded-full bg-green-100 pb-1 text-sm font-semibold px-2 text-center text-green-600'>• Success</span>
    }
    if(data.status === 'pending'){
        return <span className='ml-2 rounded-full bg-yellow-100 pb-1 text-sm font-semibold px-2 text-center text-yellow-600'>• Pending</span>
    }
}
const TypeStyle = ({data})=>{
    if(data.type === 'payment'){
        return <span className='rounded-full border-blue-600 border-[2px] bg-blue-100 pb-1 text-sm font-semibold px-2 text-center text-blue-600'>• Payment</span>
    }
    if(data.type === 'refund'){
        return <span className='rounded-full border-red-600 border-[2px] bg-red-100 pb-1 text-sm font-semibold px-2 text-center text-red-600'>• Refund</span>
    }
}
const ItemTransaction = ({...props}) => {
    console.log(props)
  return (
    <tr className='hover:bg-gray-100 cursor-pointer border-b-2'>
        <td className='p-4'><AmountStyle data={props.item}></AmountStyle></td>
        <td><StatusStyle data={props.item}></StatusStyle></td>
        <td className='p-4'>{props.item.message}</td>
        <td className='p-4'>{props.item.orderID}</td>
        <td className='p-4'>{fomart.formatTime(props.item.createdAt)}</td>
        <td className='p-4'><TypeStyle data={props.item}></TypeStyle></td>
    </tr>
  )
}

export default ItemTransaction