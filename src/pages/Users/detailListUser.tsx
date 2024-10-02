import SideBar from "../../components/sidebar/sidebar";
import { SiTicktick } from "react-icons/si";
import { GiCancel } from "react-icons/gi";
import Paginate from "../../components/paginate/Users/paginateDetail";
import AvatarDefault from '../../assets/png/Avatar.png'
import React, { useState } from "react";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { DateFrom } from "../../components/Date/DateFrom/dateFrom";
import { DateTo } from "../../components/Date/DateTo/dateTo";
import { StatusBox } from "../../components/Box/StatusBox/statusBox";
import {selectStatus} from "../../components/Box/StatusBox/statusBox";
import {  TypeBox } from "../../components/Box/TypeBox/typeBox";
import {selectType} from "../../components/Box/TypeBox/typeBox";
import { SortBox } from "../../components/Box/SortBox/sortBox";
import AlertDialog from "../../components/Box/DialogBox/dialogBox";
import axiosInstance from "../../components/API/axiosInstance";
import { useEffect } from "react";

const DetailListUser = () => {
    const {id} = useParams()
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [status,setStatus] = useState<'all' | 'completed' | 'fail' | 'pending' | 'refund'>('all');
    const [type,setType] = useState<'all' | 'transfer' | 'deposit' | 'payment' | 'withdraw'>('all');
    const [sort,setSort] = useState<'asc' | 'desc'>('desc');
    const [selectDateFrom,setSelectDateFrom] = useState<Date | null>(null);
    const [selectDateTo,setSelectDateTo] = useState<Date | null>(null);
    const location = useLocation();
    const {nameID} = location.state;
    useEffect(() => {
        const storedCurrentPage = Number(localStorage.getItem('currentPage')) || 1;
        const storedStatus = localStorage.getItem('status') || '';
        const storedType = localStorage.getItem('type') || '';
        const storedSort = localStorage.getItem('sortOrder') || 'desc';
        const storedFromDate = localStorage.getItem('selectedFromDate');
        const storedToDate = localStorage.getItem('selectedToDate');
    
        setCurrentPage(storedCurrentPage);
        setStatus(storedStatus as 'all' | 'completed' | 'fail' | 'pending' | 'refund');
        setType(storedType as 'all' | 'transfer' | 'deposit' | 'payment' | 'withdraw');
        setSort(storedSort as 'asc' | 'desc');
        setSelectDateFrom(storedFromDate ? new Date(storedFromDate) : null);
        setSelectDateTo(storedToDate ? new Date(storedToDate) : null);
      }, []);
    
      useEffect(() => {
        localStorage.setItem('currentPage', currentPage.toString());
        localStorage.setItem('status', status);
        localStorage.setItem('type', type);
        localStorage.setItem('sortOrder', sort);
        localStorage.setItem('selectedFromDate', selectDateFrom?.toISOString() || '');
        localStorage.setItem('selectedToDate', selectDateTo?.toISOString() || '');
      }, [currentPage, status, type, sort, selectDateFrom, selectDateTo]);
    
    const {data,isLoading,isError } = useQuery({
        queryKey: ['get-details',id],
        queryFn: async()=>{
            const response =  await axiosInstance.get(`/api/v1/user/get-details?id=${id}`);
            return response.data.data
        }
    })    
    console.log(data)
    console.log(id)
    if(isLoading)
        return <div>Loading...</div>
    
    if (isError) 
        return <div>Error loading data</div>    
    
    //Sort 
    const handleSort = () => {
        setSort(sort === 'asc' ? 'desc' : 'asc')
    }
    //Status
    const handleStatus = (e:React.ChangeEvent<HTMLSelectElement>) =>{
        setStatus(e.target.value as 'all' | 'completed' | 'fail' | 'pending' | 'refund');
    }

    //Type
    const handleType = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value as 'all' | 'transfer' | 'deposit' | 'payment' | 'withdraw');
    }
    
    const resetFilter = () => {
        setStatus('all');
        setType('all');
        setSelectDateFrom(null);
        setSelectDateTo(null);
        localStorage.removeItem('Type')
        localStorage.removeItem('Status')
        localStorage.removeItem('selectedFromDate')
        localStorage.removeItem('selectedToDate')
    }


    return (
        <>
            <div className="flex w-full font-poppins h-screen">
                <SideBar state={"Users"} />
                <div className="flex flex-1 flex-col px-4 ml-[210px]">
                    <div id="Title" className="text-[30px] mt-[5px] mb-[5px] font-bold "></div>
                    <div className=" px-5 py-5 border-[2px] rounded-[16px] flex justify-between shadow-[4px_4px_4px_rgba(0,0,0,0.10)]">
                            <div id="ViewUser">
                                <div id="InforUser" className="flex items-center h-full">
                                    <div id="avatarUser" className=" shrink-0">
                                        <img src={data.avatar ? data.avatar : AvatarDefault} className="size-[60px] border rounded-full" /> 
                                </div>
                                <div className="flex flex-col h-full justify-between pl-5 ">
                                      <div className="w-fit flex justify-between items-center">
                                          <div id="nameUser" className="text-xl font-bold text-[#1E3A5F] uppercase flex-grow ">{data.full_name || nameID}</div>
                                          <div className={`flex items-center gap-x-[5px] pl-2 ${!data?.inactive ? 'text-[#027A48]' : 'text-[#FF1717]'}`}>
                                              <div id="iconActiveUser">{!data?.inactive ? <SiTicktick /> : <GiCancel />}</div>
                                              <div id="activeUser" className="text-md"> {!data?.inactive ? 'Active' : "Inactive"}</div>
                                          </div>
                                      </div>
                                        <div id="emailUser" className="w-fit text-lg flex items-center justify-center gap-x-[8px] text-[#0094FF]">{data?.email}</div>
                                </div>   
                                </div>
                            </div>
                                <AlertDialog/>
                            </div>
                    
                    <div className="overflow-x-auto h-screen relative">
                        <div id="stick" className="flex justify-between items-center mt-[20px] mb-[5px]">
                            <div id="Title" className="text-[20px] font-semibold">Transaction History</div>
                            <div className="flex items-center gap-x-[10px] mx-2">
                                <div id="FromDate" className="relative z-20 ">
                                    <DateFrom selectedFromDate={selectDateFrom} setSelectedFromDate={setSelectDateFrom}/>    
                                </div>
                                <div id="ToDate" className=" relative z-20">
                                    <DateTo selectedToDate={selectDateTo} setSelectedToDate={setSelectDateTo}/>
                                </div>
                                <div id="Status" className="flex items-center gap-x-[10px] ">
                                    <StatusBox status={status} handleStatus={handleStatus} select={selectStatus} />
                                </div>
                                <div id="Type" className="flex items-center gap-x-[10px] ">
                                    <TypeBox type={type} handleType={handleType} select={selectType} />
                                </div>
                                <div id="DeleteFilter">
                                    <Button variant="contained" className="h-[56px] bg-[#FF1717]" sx={{height: 36}} onClick={resetFilter}>Delete </Button>
                                </div>
                                <div id="SortBox" className="flex gap-x-[10px] h-[36px]">
                                    <SortBox sortOrder={sort} handleSortOrder={handleSort}/>
                                </div>
                            </div>
                        </div>
                            <Paginate 
                                currentPage = {currentPage}
                                setCurrentPage = {setCurrentPage}
                                selectedFromDate = {selectDateFrom}
                                selectedToDate = {selectDateTo}
                                sortOrder = {sort} 
                                filterStatus={status}
                                filterType={type}                    
                            />

                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailListUser