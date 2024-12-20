import { GoDotFill } from "react-icons/go";
import {ITransaction} from '@/interfaces/transaction'

export type listTransactions = Pick<ITransaction,'message' | 'amount' | 'createdAt' | 'status' | 'type'>

export function formatCurrency(money: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND'
  }).format(money);
} 
export function formatDate(dateString:string):string{
  const date = new Date(dateString);
 
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2,'0');
  const day = String(date.getDate()).padStart(2,'0');

  const hour = String(date.getHours()).padStart(2,'0');
  const minute = String(date.getMinutes()).padStart(2,'0');
  const second = String(date.getSeconds()).padStart(2,'0');

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}


function TransactionHistory({message,amount,status,createdAt,type}:ITransaction){
    return (
        <>  
            <td> 
              <div className="pl-3">{message}</div>
            </td>
            <td 
              className={` pl-3 min-w-[95px] ${(type.toLowerCase() === 'deposit' || type.toLowerCase() === 'refund') ? 'text-[#027A48]' : 'text-[#FF1717]'}`}
            >
              { (type.toLowerCase() === 'deposit' && 'Deposit' || type.toLowerCase() === 'refund' && 'Refund')
                ? `+${formatCurrency(amount)}`
                : `-${formatCurrency(amount)}` 
              }
            </td>
            <td>
              <div className={`pl-3 w-fit ${status.toLowerCase() ==='completed' ? 'text-[#027A48] bg-[#ECFDF3]' 
                : status.toLowerCase() === 'refund' ? 'bg-[#F2F4F7] text-[#344054]' 
                : status.toLowerCase() === 'pending' ? 'bg-[#FFF3CD] text-[#F59E0B]' 
                : 'bg-[#FFE3E3] text-[#FF1717]'} h-[30px] px-[8px] rounded-[16px] flex items-center`}>
                <GoDotFill className="ml-[6px] mr-[4px] "/>
                <div className=" mr-[8px] text-sm font-semibold">
                    {status.toLowerCase() === 'completed' &&'Completed'}
                    {status.toLowerCase() === 'fail' &&'Fail'}
                    {status.toLowerCase() === 'pending' &&'Pending'}
                    {status.toLowerCase() === 'refund' &&'Refund'}
                </div>
              </div>
            </td>
            <td>
              <div className="pl-3"> 
                {createdAt ? formatDate(createdAt) : 'N/A'}
              </div>
            </td>
            <td className="py-4">
              <div className={`w-fit border-[2.5px] ${type.toLowerCase() ==='transfer' ? 'text-[#175CD3] border-[#175CD3]' 
                : type.toLowerCase() === 'deposit' ? 'border-[#039855] text-[#039855]' 
                : type.toLowerCase() === 'withdraw' ? 'border-[#F59E0B] text-[#F59E0B]'
                : type.toLowerCase() === 'withdraw-partner' ? 'border-[#F59E0B] text-[#F59E0B]'
                : type.toLowerCase() === 'refund' ? 'border-[#F2F4F7] text-[#c2cbda]' 
                : 'border-[#C11574] text-[#C11574]'} h-[30px] px-[8px] rounded-[16px] flex items-center justify-center`}>
                <GoDotFill className="ml-[6px] mr-[4px] "/>
                <div className=" mr-[8px] text-center text-sm font-semibold">
                    {type.toLowerCase() === 'transfer' && 'Transfer'}
                    {type.toLowerCase() === 'deposit' && 'Deposit'}
                    {type.toLowerCase() === 'payment'&& 'Payment'}
                    {type.toLowerCase() === 'pay-with-card'&& 'Payment'}
                    {type.toLowerCase() === 'refund' && 'Refund'}
                    {type.toLowerCase() === 'withdraw'&& 'Withdraw'}
                    {type.toLowerCase() === 'withdraw-partner'&& 'WithdrawPartner'}
                </div>
              </div>
            </td>
        </>
    )
}
export default TransactionHistory