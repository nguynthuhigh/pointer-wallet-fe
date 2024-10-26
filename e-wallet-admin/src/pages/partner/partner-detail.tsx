import axiosInstance from "@/api/axiosInstance";
import SideBar from "@/components/sidebar/sidebar";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import AvatarDefault from '../../assets/png/avatarDefault.png'
import AlertDialog from '../../components/box/box-dialog'
import { DateFrom } from "@/components/date/date-from";
import { DateTo } from "@/components/date/date-to";
import { selectStatus, StatusBox } from "@/components/box/box-status";
import { selectType, TypeBox } from "@/components/box/box-type";
import { Button } from "@mui/material";
import { SortBox } from "@/components/box/box-sort";
import { SiTicktick } from "react-icons/si";
import { GiCancel } from "react-icons/gi";

import React, { useEffect, useState } from "react";
import PaginatePartnersDetail from "@/components/paginate/partner/paginate-partner-detail";
import { IPartnerData } from "@/components/paginate/partner/paginate-partner";
const PartnersDetail = () => {
  const { id } = useParams();
  const [status, setStatus] = useState<'all' | 'completed' | 'fail' | 'pending' | 'refund'>('all');
  const [type, setType] = useState<'all' | 'transfer' | 'deposit' | 'payment' | 'withdraw'>('all');
  const [sort, setSort] = useState<'asc' | 'desc'>('desc');
  const [selectDateFrom, setSelectDateFrom] = useState<Date | null>(null);
  const [selectDateTo, setSelectDateTo] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

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
  const { data, isLoading, isError } = useQuery({
    queryKey: ['get-details-partners'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/v1/partner-management/get-details`, {
        params: {
          id: id
        }
      })
      return response.data.data
    }
  })
  if (isLoading) return 'Loading...'
  if (isError) return 'Error Fetching Data'


  //Handle
  const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as 'all' | 'completed' | 'fail' | 'pending' | 'refund')
  }
  const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as 'all' | 'transfer' | 'deposit' | 'payment' | 'withdraw')
  }
  const handleSort = () => {
    setSort(sort === 'asc' ? 'desc' : 'asc')
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
  const getNameID = (partner: IPartnerData) => {
    if (partner.name) return partner.name
    return `P${partner._id.slice(-4)}`
  }
  return (
    <>
      <div className="flex w-full h-screen">
        <div className="flex flex-1 flex-col px-4">
          <div id="Title" className="text-[30px] mt-[10px] font-bold "></div>
          <div className=" px-4 py-4 border-[2px] rounded-[16px] flex justify-between shadow-[4px_4px_4px_rgba(0,0,0,0.10)]">
            <div id="ViewPartner">
              <div id="InforPartner" className="flex items-center h-full">
                <div id="avatarPartner" className=" shrink-0">
                  <img src={data.avatar ? data.avatar : AvatarDefault} className="size-[60px] border rounded-full" />
                </div>
                <div className="flex flex-col h-full justify-between pl-5 ">
                  <div className="w-fit flex justify-between items-center">
                    <div id="name" className="text-xl font-bold text-[#1E3A5F] uppercase flex-grow ">{data.full_name || getNameID(data)}</div>
                    <div className={`flex items-center gap-x-[5px] pl-2 ${!data?.inactive ? 'text-[#027A48]' : 'text-[#FF1717]'}`}>
                      <div id="iconActive">{!data?.inactive ? <SiTicktick /> : <GiCancel />}</div>
                      <div id="active" className="text-md"> {!data?.inactive ? 'Active' : "Inactive"}</div>
                    </div>
                  </div>
                  <div id="email" className="w-fit text-lg flex items-center justify-center gap-x-[8px] text-[#0094FF]">{data?.email}</div>
                </div>
              </div>
            </div>
            <AlertDialog />
          </div>
          <div className="overflow-x-auto h-screen relative">
            <div id="stick" className="flex justify-between items-center mt-[20px]">
              <div id="Title" className="text-[20px] font-semibold">Transaction History</div>
              <div className="flex items-center gap-x-[10px] mx-2">
                <div id="Status" className="flex items-center gap-x-[10px] ">
                  <StatusBox status={status} handleStatus={handleStatus} select={selectStatus} />
                </div>
                <div id="Type" className="flex items-center gap-x-[10px] ">
                  <TypeBox type={type} handleType={handleType} select={selectType} />
                </div>
                <div id="FromDate" className="relative z-30 ">
                  <DateFrom selectedFromDate={selectDateFrom} setSelectedFromDate={setSelectDateFrom} />
                </div>
                <div id="ToDate" className=" relative z-30">
                  <DateTo selectedToDate={selectDateTo} setSelectedToDate={setSelectDateTo} />
                </div>

                <div id="DeleteFilter">
                  <Button variant="contained" className="h-[56px] bg-[#FF1717]" sx={{ height: 36 }} onClick={resetFilter}>Delete </Button>
                </div>
                <div id="SortBox" className="flex gap-x-[10px] h-[36px]">
                  <SortBox sortOrder={sort} handleSortOrder={handleSort} />
                </div>
              </div>
            </div>
            <PaginatePartnersDetail
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              filterType={type}
              filterStatus={status}
              selectedFromDate={selectDateFrom}
              selectedToDate={selectDateTo}
              sortOrder={sort} />
          </div>
        </div>
      </div>
    </>
  )
}

export default PartnersDetail