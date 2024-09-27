import axiosInstance from "@/components/API/axiosInstance";
import SideBar from "@/components/sidebar/sidebar";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom"
import AvatarDefault from '../../assets/png/Avatar.png'
import AlertDialog from "@/components/Box/DialogBox/dialogBox";
import { DateFrom } from "@/components/Date/DateFrom/dateFrom";
import { DateTo } from "@/components/Date/DateTo/dateTo";
import { selectStatus, StatusBox } from "@/components/Box/StatusBox/statusBox";
import { selectType, TypeBox } from "@/components/Box/TypeBox/typeBox";
import { Button } from "@mui/material";
import { SortBox } from "@/components/Box/SortBox/sortBox";
import { SiTicktick } from "react-icons/si";
import { GiCancel } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";
import { SlEnvolope } from "react-icons/sl";
import { formatDate } from "@/components/transaction/TransactionHistory";
import React, { useState } from "react";
import PaginatePartnersDetail from "@/components/paginate/PartnersP/paginatePartnersDetail";
const PartnersDetail = () => {
  const {id} = useParams();
  const location = useLocation();
  const {getName} = location.state;
  const [status,setStatus] = useState<string>('');
  const [type,setType] = useState<string>('');
  const [sort,setSort] = useState<'asc' | 'desc'>('desc');
  const [selectDateFrom,setSelectDateFrom] = useState<Date | null>(null);
  const [selectDateTo,setSelectDateTo] = useState<Date | null>(null);


  const {data,isLoading,isError} = useQuery({
    queryKey: ['get-details-partners'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/v1/partner-management/get-details`,{
        params: {
          id:id
        }
      })
      return response.data.data
    }
  })
  if(isLoading) return 'Loading...'
  if(isError) return 'Error Fetching Data'


  //Handle
  const handleStatus = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as string)
  }
  const handleType = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setType (e.target.value as string)
  }
  const handleSort = () => {
    setSort(sort === 'asc' ? 'desc' : 'asc')
  }
  const resetFilter = () => {
    setStatus('')
    setType('')
    setSelectDateFrom(null)
    setSelectDateTo(null)
  }
  return (
    <>
        <div className="flex w-full font-poppins h-screen">
                <SideBar state={"Partners"} />
                <div className="flex flex-1 flex-col px-4">
                    <div id="Title" className="text-[30px] mt-[10px] mb-[5px] font-bold ">Partner Information</div>
                        <div className=" px-6 py-6 border-[2px] rounded-[16px] flex justify-between shadow-[4px_4px_4px_rgba(0,0,0,0.10)]">
                        <div id="ViewUser">
                                <div id="InforPartner" className="flex items-center h-full">
                                    <div id="avatarPartner" className=" shrink-0">
                                        <img src={data.avatar ? data.avatar : AvatarDefault} className="size-[60px] border rounded-full" /> 
                                </div>
                                <div className="flex flex-col h-full justify-between pl-5 ">
                                      <div className="w-fit flex justify-between items-center">
                                          <div id="nameUser" className="text-xl font-bold text-[#1E3A5F] uppercase flex-grow ">{data.full_name || getName}</div>
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
                        <div id="stick" className="flex justify-between items-center mt-[20px] mb-[20px]">
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
                          <PaginatePartnersDetail/>
                    </div>
                </div>
            </div>
    </>
  )
}

export default PartnersDetail