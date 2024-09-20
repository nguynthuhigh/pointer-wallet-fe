import SideBar from "../components/sidebar/sidebar";
import { SiTicktick } from "react-icons/si";
import { GiCancel } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";
import { TbLogin2 } from "react-icons/tb";
import { CgSortAz } from "react-icons/cg";
import { CgSortZa } from "react-icons/cg";
import Paginate from "../components/paginate/paginate";
import AvatarDefault from '../assets/png/Avatar.png'
import React, { useState } from "react";
import { Button } from "@mui/material";
import DatePicker from "react-datepicker";
import transactionInstance from "../components/API/transactionInstance.api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import TransactionHistory from "../components/transaction/TransactionHistory";
import { formatDate } from "../components/transaction/TransactionHistory";
interface User {
    _id: string;
    avatar?: string;
    full_name?: string;
    email: string;
    createdAt: string;
    updateAt?: string;
    inactive: boolean;
}


const DetailListUser = () => {
    const {id} = useParams()
    const [status,setStatus] = useState('');
    const [type,setType] = useState('all');
    const [sort,setSort] = useState<'asc' | 'desc'>('desc');
    const [selectDateFrom,setSelectDateFrom] = useState<Date | null>(null);
    const [selectDateTo,setSelectDateTo] = useState<Date | null>(null);

    const { data,isLoading,isError } = useQuery({
        queryKey: ['details-user',id],
        queryFn: async()=>{
            const response =  await transactionInstance.get(`get-details?id=${id}`);
            return response.data.data;
        }
    })    

    if(isLoading)
        return <div>Loading</div>
    
    if (isError) 
        return <div>Error loading data</div>    
        
    //Sort 
    const handleSort = () => {
        setSort(sort === 'asc' ? 'desc' : 'asc')
    }
    //Status
    const handleStatus = (e:React.ChangeEvent<HTMLSelectElement>) =>{
        setStatus(e.target.value as string);
    }

    //Type
    const handleType = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value as string);
    }

    const resetFilter = () => {
        setStatus('');
        setType('');
        setSelectDateFrom(null);
        setSelectDateTo(null);
    }

    const getFilterData = (): TransactionHistory[] => {
        if (!data || !data.transactions || !data.transactions.transaction) return [];

        return data.transactions.transaction.filter((transaction:TransactionHistory) => {  
            if (!transaction.createdAt) return false;

            const transactionFromDate = new Date(transaction.createdAt);
            const transactionToDate = selectDateTo ? new Date(selectDateTo) : null
            if (transactionToDate) transactionToDate.setHours(23,59,59,999);
            
            const isDateRange = (!selectDateFrom || transactionFromDate >= selectDateFrom) &&
                (!transactionToDate || transactionFromDate <= transactionToDate)
            return (status ? transaction.status.toLowerCase() === status.toLowerCase(): true)  &&
                    (type ? transaction.type.toLowerCase() === type.toLowerCase(): true) && isDateRange;
        })
        .sort((a:TransactionHistory,b:TransactionHistory) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return sort === 'asc' ? dateA - dateB : dateB - dateA
        })
    }

    return (
        <>
            <div className="flex w-full font-poppins h-screen">
                <SideBar state={"Customers"} />
                <div className="flex flex-1 flex-col px-4">
                    <div id="Title" className="text-[36px] mt-[10px] font-bold mb-[10px] ">User Information</div>
                    <div id = 'parent' className=" px-6 py-3 border-2 border-gray-300 rounded-[16px] flex justify-between shadow-[4px_4px_4px_rgba(0,0,0,0.10)]">
                            <div id="ViewUser">
                                <div id="InforUser" className="flex items-center gap-6 mb-4">
                                    <div id="avatarUser" className=" shrink-0">
                                        <img src={data?.avatar ? data.avatar : AvatarDefault} className="size-[70px] border rounded-full" /> 
                                    </div>
                                    <div className="flex flex-col">
                                        <div className=" flex justify-between items-center gap-x-[10px]">
                                            <div id="nameUser" className="text-xl font-bold text-black">{data?.full_name}</div>
                                            <div className={`flex items-center gap-x-[5px] ${!data?.inactive ? 'text-[#027A48]' : 'text-[#FF1717]'}`}>
                                                <div id="iconActiveUser">{!data?.inactive ? <SiTicktick /> : <GiCancel />}</div>
                                                <div id="activeUser" className="text-base"> {!data?.inactive ? 'Active' : "Inactive"}</div>
                                            </div>
                                        </div>
                                        <div id="emailUser" className="text-base text-[#0094FF]">{data?.email}</div>
                                    </div>
                                </div>
                                <div id="joinDate&&attended" className="flex gap-x-[10px]">
                                    <div id="johndateUser" className="w-fit text-base text-black border-2 rounded-[16px] border-[#0094FF] flex items-center justify-center p-[10px] gap-x-[8px]"><SlCalender /> Joined {data ? formatDate(data.createdAt) : 'N/A'}</div>
                                    <div id="attendedUser" className="w-fit text-base text-black border-2 rounded-[16px] border-[#0094FF] flex items-center justify-center p-[10px] gap-x-[8px]"><TbLogin2 /> Attended 7 days ago</div>
                                </div> 
                        </div>
                        <div id="BanUser" className="border-2 border-gray-300 bg-white w-fit h-fit text-black p-3 rounded-[16px] hover:bg-[#FF1717] hover:text-white hover:border-[#FF1717] hover:shadow-lg hover:shadow-[#FF1717]/50 transition-all duration-300 cursor-pointer">
                                <button >Ban User</button>
                        </div>
                    </div>
                    <div className="overflow-x-auto h-screen relative">
                        <div id="stick" className="flex justify-between sticky ">
                            <div id="Title" className="text-[20px] font-semibold mt-[20px] mb-[30px]">Transaction History</div>
                            <div className="flex items-center gap-x-[10px] mx-2">
                                <div className="relative z-20 ">
                                    <div>
                                        <DatePicker 
                                        selected={selectDateFrom}
                                        onChange={(date) => setSelectDateFrom(date)}
                                        className="border-[1px] p-1 rounded-[4px] border-gray-300 w-full text-center text-sm h-[36px]"
                                        dateFormat="yyyy/MM/dd"
                                        placeholderText="yyyy/mm/dd"/>
                                        <span className="absolute top-[-0.5rem] left-[35px] transform -translate-x-1/2 bg-white text-sm text-[#0094FF] px-1">From:</span>
                                    </div>
                                </div>
                                <div className=" relative z-20">
                                    <div>
                                        <DatePicker 
                                        selected={selectDateTo}
                                        onChange={(date)=>setSelectDateTo(date)}
                                        className="border-[1px] p-1 rounded-[4px] border-gray-300 w-full text-center text-sm h-[36px]"
                                        dateFormat="yyyy/MM/dd"
                                        placeholderText="yyyy/mm/dd"
                                        />
                                        <span className="absolute top-[-0.5rem] left-[25px] transform -translate-x-1/2 bg-white text-sm text-[#0094FF] px-1">To:</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-x-[10px] ">
                                    <div className="relative w-[150px] h-[36px]">
                                        <select value={status} onChange={handleStatus} className="font-poppins text-sm w-full h-full pl-[15px] border-[1px] border-gray-300 rounded-[3px] text-[#39325A] outline-none appearance-none">
                                            <option>All</option>
                                            <option value="completed">Completed</option>
                                            <option value="fail">Fail</option>
                                            <option value="pending">Pending</option>
                                            <option value="refund">Refund</option>
                                        </select>
                                        <span className="absolute top-[-0.5rem] left-[35px] transform -translate-x-1/2 bg-white text-sm text-[#0094FF] px-1">Status</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-x-[10px] ">
                                    <div className="relative w-[150px] h-[36px]">
                                        <select value={type} onChange={handleType} className="font-poppins text-sm w-full h-full pl-[15px] border-[1px] border-gray-300 rounded-[3px] text-[#39325A] outline-none appearance-none">
                                            <option>All</option>
                                            <option value="transfer">Transfer</option>
                                            <option value="deposit">Deposit</option>
                                            <option value="payment">Payment</option>
                                            <option value="withdraw">Withdraw</option>
                                        </select>
                                        <span className="absolute top-[-0.5rem] left-[30px] transform -translate-x-1/2 bg-white text-sm text-[#0094FF] px-1">Type</span>
                                    </div>
                                </div>
                                <div id="DeleteFilter">
                                    <Button variant="contained" className="h-[56px] bg-[#FF1717]" sx={{height: 36}} onClick={resetFilter}>Delete Filter</Button>
                                </div>
                                <div id="SortBox" onClick = {handleSort}className="flex h-[36px] items-center border-[1px] border-gray-300 rounded-[8px] px-3 cursor-pointer hover:shadow-lg hover:shadow-[#0094FF]/50 duration-300 transition-all hover:bg-[#0094FF] hover:border-[#0094FF] hover:text-white">
                                    <div>{sort === 'asc' ? (<CgSortZa className="size-[18px]" />) : (<CgSortAz className="size-[18px]"/>)}</div>
                                </div>
                            </div>
                        </div>
                            <Paginate type={type} userID={id}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailListUser