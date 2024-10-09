import { ITransaction } from "@/interface/transaction"
import { SiTicktick } from "react-icons/si"
import { formatCurrency } from "../transaction/TransactionHistory"

type TransactionPick = Pick<ITransaction, 'status' | '_id' | 'title' | 'message' | 'amount' | 'type'>

export const CardTransactionDetail = ({ status, _id, title, message, type, amount }: TransactionPick) => {
    return (
        <>
            <div className="px-4 py-4 border-[1px] rounded-[16px] w-[400px] shadow-[4px_4px_4px_rgba(0,0,0,0.10)]">
                <div className="grid grid-cols-3 mb-[8px]">
                    <div id="DetailTransaction" className="text-lg font-bold col-span-2">
                        Transactions Detail
                    </div>
                    <div id="Status" className="flex items-center gap-x-[5px]">
                        <div id="Name" className="text-lg font-semibold text-[#44A55B]" >
                            {status.toLowerCase() === 'completed' && 'Completed'}
                            {status.toLowerCase() === 'fail' && 'Fail'}
                            {status.toLowerCase() === 'pending' && 'Pending'}
                            {status.toLowerCase() === 'refund' && 'Refund'}
                        </div>
                        <div id="Value" className={`${status.toLowerCase() === 'completed' ? 'text-[#44A55B]'
                            : status.toLowerCase() === 'fail' ? 'text-[#FF1717]'
                                : status.toLowerCase() === 'pending' ? 'text-[#F59E0B]'
                                    : 'text-[#C11574]'}`}
                        ><SiTicktick className="size-[15px]" /></div>
                    </div>
                </div>
                <div className="grid grid-cols-3">
                    <div className="flex flex-col gap-y-[10px] col-span-2">
                        <div id="TransactionsCode">
                            <div id="Name" className="text-sm text-[#758694] ">Transaction Code</div>
                            <div id="Value" className="text-md font-semibold">{_id}</div>
                        </div>
                        <div id="Title">
                            <div id="Name" className="text-sm text-[#758694]">Title</div>
                            <div id="Value" className="text-md font-semibold text-[#0094FF]">{title ? title : 'null'}</div>
                        </div>
                        <div id="Message">
                            <div id="Name" className="text-sm text-[#758694]" >Message</div>
                            <div id="Value" className="text-md font-semibold">{message ? message : 'null'}</div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-[10px]">
                        <div id="Type">
                            <div id="Name" className="text-sm text-[#758694]" >Type</div>
                            <div id="Value" className={`text-md font-semibold ${type.toLowerCase() === 'transfer' ? 'text-[#175CD3] border-[#175CD3]'
                                : type.toLowerCase() === 'deposit' ? 'border-[#039855] text-[#039855]'
                                    : type.toLowerCase() === 'withdraw' ? 'border-[#F59E0B] text-[#F59E0B]'
                                        : 'border-[#C11574] text-[#C11574]'}`} >
                                {type.toLowerCase() === 'transfer' && 'Transfer'}
                                {type.toLowerCase() === 'deposit' && 'Deposit'}
                                {type.toLowerCase() === 'payment' && 'Payment'}
                                {type.toLowerCase() === 'pay-with-card' && 'Payment'}
                                {type.toLowerCase() === 'withdraw' && 'Withdraw'}
                            </div>
                        </div>
                        <div id="Amount">
                            <div id="Name" className="text-sm text-[#758694]" >Amount</div>
                            <div id="Value" className={`text-md font-semibold ${amount < 0 ? 'text-[#FF1717]' : 'text-[#44A55B]'}`} >{formatCurrency(amount)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}