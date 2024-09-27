import React from 'react'
import { formatDate } from '../../utils/format_date'
import { formatCurrency } from '../../utils/format_currency'
interface TransactionInfoProps{
    title:string,
    image:string,
    createdAt:Date,
    amount:number,
    status:boolean,
    currency:{
        symbol:string
    },
    sender:{
        _id:string,
        email:string,
        full_name:string
    },
    receiver:{
        _id:string,
        email:string,
        full_name:string
    },
    type:string,
    userID:string,
}
const TransactionInfo:React.FC<TransactionInfoProps> = (props) => {
  return (
    <div class={`max-sm:text-sm`}>
        <div class={`flex items-center justify-between`}>
       <div class={`flex items-center`}>
          <img class={`w-20 h-20 `} src=''></img>
            <div class={`ml-2`}>
              {props.title ? <h1>{props.title}</h1>: <FormatTitle {...props}></FormatTitle>}
              <h1>{props.image}</h1>
            </div>
        </div>
        <h1>{formatDate(props.createdAt)}</h1>
      </div>
      <hr></hr>
      
      <div class={` p-4 my-2`}>
        <div class={`flex items-center justify-between my-3`}>
          <h1 class={`text-4xl max-sm:text-2xl`}>{formatCurrency(props.amount,props.currency.symbol)}</h1>
          <h1 class={`bg-green-50 text-green-500 w-fit h-fit p-1.5 rounded-full text-sm`}>✔ Completed</h1>
        </div>
      </div>
    </div>
  )
}
const FormatTitle = ({...props})=>{
    switch(props.type){
        case 'transfer':
            return <>   
                <h1>{props.sender._id !== props.userID ? 'Nhận tiền từ ' + props.sender.full_name : 'Chuyển tiền đến ' +  props.receiver.full_name}</h1>
            </>
        case 'payment':
            return <></>
        default: return <></>
    }
}
export default TransactionInfo