import { DateFrom } from "@/components/date/date-from"
import { FilterBox } from "@/components/box/box-filter"
import { DateTo } from "@/components/date/date-to"
import { useState } from "react"
import { SearchBox } from "@/components/box/box-search"
import { SortBox } from "@/components/box/box-sort"
import { PaginateVoucher } from "@/components/paginate/voucher/paginate-voucher"
import { HeaderComponent } from "@/components/header/header"
import { motion } from 'framer-motion'

export const VoucherList = () => {
    // const [currentPage,setCurrentPage] = useState<number>(1)
    // const getNumber = (index:number) => { 
    //     return (currentPage - 1) * itemsPerPage + index + 1
    // }
    const [search, setSearch] = useState<string>('');
    const [filter, setFilter] = useState<'all' | 'false' | 'true'>('all');
    const [selectedFromDate, setSelectedFromDate] = useState<Date | null>(null);
    const [selectedToDate, setSelectedToDate] = useState<Date | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    //Handle
    const handleFilterChange = (newFilter: 'all' | 'false' | 'true') => {
        setFilter(newFilter);
    };

    const handleSortOrder = () => {
        setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    const clearFilters = () => {
        setSearch('');
        setFilter('all');
        setSelectedFromDate(null);
        setSelectedToDate(null);
    }
    return (
        <>
            <div className="flex-1 h-screen mx-auto overflow-hidden">
                <HeaderComponent title="Vouchers Management" />
                <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-gray-800 backdrop-opacity-70 backdrop-blur-md px-5 py-1 rounded-[6px] relative z-20 ">
                        <div className="flex items-center justify-between pb-[10px]">
                            <div className="flex items-end text-base py-[10px] gap-x-[20px] cursor-pointer relative justify-center w-full">
                                <div id="Active">
                                    <FilterBox filter={filter} handleFilterChange={handleFilterChange} />
                                </div>
                                <div id="FromDate" className="relative z-50">
                                    <DateFrom selectedFromDate={selectedFromDate} setSelectedFromDate={setSelectedFromDate} />
                                </div>
                                <div id="ToDate" className='relative z-50'>
                                    <DateTo selectedToDate={selectedToDate} setSelectedToDate={setSelectedToDate} />
                                </div>
                                <div id="BtnDeleteFilter">
                                    <button
                                        className="bg-blue-500 h-[42px] w-[100px] rounded-[6px] font-semibold uppercase text-center"
                                        onClick={clearFilters}>
                                        Delete
                                    </button>
                                </div>
                                <div id="SearchSort" className="flex gap-x-[20px] h-[42px] ml-auto">
                                    <SearchBox search={search} handleSearch={handleSearch} />
                                    <SortBox sortOrder={sortOrder} handleSortOrder={(handleSortOrder)} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="bg-gray-800 backdrop-opacity-70 backdrop-blur-md px-5 py-4 rounded-[6px] relative z-10"
                    >
                        <PaginateVoucher
                            sortOrder={sortOrder}
                        />
                    </motion.div>

                </main>
            </div>
        </>
    )
}
