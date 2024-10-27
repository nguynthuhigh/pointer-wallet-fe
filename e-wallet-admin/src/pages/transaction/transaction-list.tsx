import SideBar from "@/components/sidebar/sidebar"
import { IVoucher } from '@/interfaces/voucher'
import React, { useState } from "react"
import { PaginateTransactions } from "@/components/paginate/transaction/paginate-transaction"
import { DateFrom } from "@/components/date/date-from"
import { DateTo } from "@/components/date/date-to"
import { Button } from "@mui/material"
import { SortBox } from "@/components/box/box-sort"
import { selectType, TypeBox } from "@/components/box/box-type"
import { selectStatus, StatusBox } from "@/components/box/box-status"
import { HeaderComponent } from "@/components/header/header"


export const TransactionsList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedFromDate, setSelectedFromDate] = useState<Date | null>(null)
  const [selectedToDate, setSelectedToDate] = useState<Date | null>(null)
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc')
  const [status, setStatus] = useState<'all' | 'completed' | 'fail' | 'pending' | 'refund'>('all')
  const [type, setType] = useState<'all' | 'transfer' | 'deposit' | 'payment' | 'withdraw'>('all');

  //Handle
  const handleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'))
  }
  const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as 'all' | 'transfer' | 'deposit' | 'payment' | 'withdraw')
  }
  const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as 'all' | 'completed' | 'fail' | 'pending' | 'refund')
  }

  const clearFilters = () => {
    setSelectedFromDate(null)
    setSelectedToDate(null)
  }
  return (
    <>
      <div className="flex-1 h-screen overflow-auto mx-auto">
        <HeaderComponent title="Transactions Management" />
        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between pb-[10px]">
            <div className="flex text-base py-[10px] gap-x-[10px] cursor-pointer">
              <div id="Status">
                <StatusBox status={status} select={selectStatus} handleStatus={handleStatus} />
              </div>
              <div id="Type">
                <TypeBox type={type} handleType={handleType} select={selectType} />
              </div>
              <div id="FromDate" className="relative z-30">
                <DateFrom selectedFromDate={selectedFromDate} setSelectedFromDate={setSelectedFromDate} />
              </div>
              <div id="ToDate" className='relative z-30'>
                <DateTo selectedToDate={selectedToDate} setSelectedToDate={setSelectedToDate} />
              </div>
              <div id="BtnDeleteFilter">
                <Button variant='contained' onClick={clearFilters} sx={{ height: '36', marginRight: '10px' }}>Delete</Button>
              </div>
            </div>
            <div id="SearchSort" className="flex gap-x-[10px] h-[36px]">
              <SortBox sortOrder={sortOrder} handleSortOrder={(handleSortOrder)} />
            </div>
          </div>
          <div>
            <PaginateTransactions
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              filterStatus={status}
              filterType={type}
              sortOrder={sortOrder}
              selectedFromDate={selectedFromDate}
              selectedToDate={selectedToDate}
            />
          </div>
        </main>

      </div>
    </>
  )
}

