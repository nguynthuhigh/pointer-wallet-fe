import axiosInstance from "@/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import AvatarDefault from '../../assets/png/avatarDefault.png'
import AlertDialog from '../../components/box/box-dialog'
import { DateFrom } from "@/components/date/date-from";
import { DateTo } from "@/components/date/date-to";
import { StatusBox } from "@/components/box/box-status";
import { TypeBox } from "@/components/box/box-type";
import { SortBox } from "@/components/box/box-sort";
import { SiTicktick } from "react-icons/si";
import { GiCancel } from "react-icons/gi";
import { motion } from 'framer-motion'
import { useEffect, useState } from "react";
import PaginatePartnersDetail from "@/components/paginate/partner/paginate-partner-detail";
import { IPartnerData } from "@/components/paginate/partner/paginate-partner";
import { HeaderComponent } from "@/components/header/header";
import { selectStatus } from "@/interfaces/status-box-item";
import { selectType } from "@/interfaces/type-box-items";
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
      <div className="flex-1 h-screen overflow-auto">
        <HeaderComponent title="Partner Detail" />
        <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5,delay:0.2}}
            className="bg-gray-800 border border-gray-700 backdrop-blur-md px-5 py-4 rounded-[6px]">
            <motion.div
              whileHover={{ y: -5 }}
              className="px-4 py-4 border-[2px] rounded-[16px] flex justify-between shadow-[0px_15px_40px_rgba(0,0,0,0.5)]">
              <div id="ViewPartner">
                <div id="InforPartner" className="flex items-center h-full">
                  <div id="avatarPartner" className=" shrink-0">
                    <img src={data.avatar ? data.avatar : AvatarDefault} className="size-[60px] border rounded-full" />
                  </div>
                  <div className="flex flex-col h-full justify-between pl-5 ">
                    <div className="w-fit flex justify-between items-center">
                      <div id="name" className="text-xl font-bold text-gray-100 uppercase flex-grow ">{data.full_name || getNameID(data)}</div>
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
            </motion.div>
            <div className="flex justify-between items-center mt-[20px]">
              <div className="flex items-end gap-x-[20px] w-full ">
                <div id="Status">
                  <StatusBox status={status} handleStatus={handleStatus} select={selectStatus} />
                </div>
                <div id="Type">
                  <TypeBox type={type} handleType={handleType} select={selectType} />
                </div>
                <div id="FromDate">
                  <DateFrom selectedFromDate={selectDateFrom} setSelectedFromDate={setSelectDateFrom} />
                </div>
                <div id="ToDate">
                  <DateTo selectedToDate={selectDateTo} setSelectedToDate={setSelectDateTo} />
                </div>
                <div id="BtnDeleteFilter">
                  <button
                    className="bg-blue-500 h-[42px] w-[100px] rounded-[6px] font-semibold uppercase text-center"
                    onClick={resetFilter}
                  >
                    Delete
                  </button>
                </div>
                <div id="SortBox" className="flex h-[42px] ml-auto">
                  <SortBox sortOrder={sort} handleSortOrder={handleSort} />
                </div>
              </div>
            </div>

          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay:0.7 }}
            className="bg-gray-800 border border-gray-700 backdrop-blur-md px-5 py-4 rounded-[6px] relative z-10"
          >
            <div id="Title" className="text-3xl font-semibold text-blue-500 mb-3">Transaction History</div>
            <PaginatePartnersDetail
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              filterType={type}
              filterStatus={status}
              selectedFromDate={selectDateFrom}
              selectedToDate={selectDateTo}
              sortOrder={sort} />
          </motion.div>
        </main>
      </div>
    </>
  )
}

export default PartnersDetail