import { DateFrom } from "@/components/date/date-from"
import SideBar from "../../components/sidebar/sidebar"
import { FilterBox } from "@/components/box/box-filter"
import { DateTo } from "@/components/date/date-to"
import { useState } from "react"
import { SearchBox } from "@/components/box/box-search"
import { SortBox } from "@/components/box/box-sort"
import AvatarDefault from '../../assets/png/avatarDefault.png'
import { GoDotFill } from "react-icons/go";

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { IVoucher } from "@/interfaces/voucher"
import {  } from "react-router-dom"
import { Button } from "@mui/material"
import { PaginateVoucher } from "@/components/paginate/voucher/paginate-voucher"
import { HeaderComponent } from "@/components/header/header"
import {motion} from 'framer-motion'
type voucherPick = Pick<IVoucher, 'image' | 'code' | 'quantity' | 'usedCount' | 'statusPublic'>

export const VoucherList = () => {
    // const [currentPage,setCurrentPage] = useState<number>(1)
    // const getNumber = (index:number) => { 
    //     return (currentPage - 1) * itemsPerPage + index + 1
    // }
    const [currentPage, setCurrentPage] = useState<number>(1);
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
                <main className="max-w-7xl mx-auto px-4 py-6">
                    <motion.div 
                        initial = {{opacity:0,y:20}}
                        animate = {{opacity:1,y:0}}
                        transition={{duration:1}}
                        className="bg-gray-800 backdrop-opacity-70 backdrop-blur-md p-4 ">
                        <div className="flex items-center justify-between pb-[10px]">
                            <div className="flex text-base py-[10px] gap-x-[10px] cursor-pointer  relative justify-center">
                                <div id="Active">
                                    <FilterBox filter={filter} handleFilterChange={handleFilterChange} />
                                </div>
                                <div id="FromDate" className="relative z-30">
                                    <DateFrom selectedFromDate={selectedFromDate} setSelectedFromDate={setSelectedFromDate} />
                                </div>
                                <div id="ToDate" className='relative z-30'>
                                    <DateTo selectedToDate={selectedToDate} setSelectedToDate={setSelectedToDate} />
                                </div>
                                <div id="BtnDeleteFilter">
                                    <Button variant='contained' onClick={clearFilters} sx={{ height: '40px', marginRight: '10px' }}>Delete</Button>
                                </div>
                            </div>
                            <div id="SearchSort" className="flex gap-x-[10px] h-[40px] mr-[10px]">
                                <SearchBox search={search} handleSearch={handleSearch} />
                                <SortBox sortOrder={sortOrder} handleSortOrder={(handleSortOrder)} />
                            </div>
                        </div>
                        <PaginateVoucher 
                            sortOrder={sortOrder}
                        />
                    </motion.div>
                </main>
            </div>
        </>
    )
}
