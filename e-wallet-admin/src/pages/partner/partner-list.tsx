import { useState } from "react"
import { FilterBox } from "../../components/box/box-filter"
import { DateFrom } from "../../components/date/date-from"
import { DateTo } from "../../components/date/date-to"
import { SearchBox } from "../../components/box/box-search"
import { SortBox } from "../../components/box/box-sort"
import { PaginatePartners } from "@/components/paginate/partner/paginate-partner"
import { Button } from "@mui/material"
import { HeaderComponent } from "@/components/header/header"
import {motion} from 'framer-motion'
const Partners = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filter, setFilter] = useState<'all' | 'false' | 'true'>('all')
    const [selectedFromDate, setSelectedFromDate] = useState<Date | null>(null)
    const [selectedToDate, setSelectedToDate] = useState<Date | null>(null);
    const [search, setSearch] = useState<string>('')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')


    //handle
    const handleFilterChange = (newFilter: 'all' | 'false' | 'true') => {
        setFilter(newFilter)
    }
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }
    const handleSort = () => {
        setSortOrder((sort => (sort === 'asc' ? 'desc' : 'asc')))
    }
    const clearFilters = () => {
        setSearch('');
        setFilter('all');
        setSelectedFromDate(null);
        setSelectedToDate(null);
    }
    return (
        <>
            <div className="flex-1 mx-auto z-10 h-screen overflow-auto">
                <HeaderComponent title="Partners Management" />
                <main className="max-w-7xl mx-auto px-4 py-6">
                    <motion.div 
                    className="bg-gray-800 bg-opacity-70 backdrop-blur-md border border-gray-700 p-4"
                    initial = {{opacity:0, y:20}}
                    animate = {{opacity:1, y:0}}
                    transition={{duration:1}}
                    >
                        <div className="flex items-center justify-between pb-[10px]">
                            <div className="flex items-center text-base gap-x-[10px] py-[10px]  cursor-pointer">
                                <div id='FilterBox' className="relative flex justify-center">
                                    <FilterBox filter={filter} handleFilterChange={handleFilterChange} />
                                </div>
                                <div className="relative z-30">
                                    <div id="FromDate">
                                        <DateFrom selectedFromDate={selectedFromDate} setSelectedFromDate={setSelectedFromDate} />
                                    </div>
                                </div>
                                <div className='relative z-30'>
                                    <div id="ToDate" className=" relative">
                                        <DateTo selectedToDate={selectedToDate} setSelectedToDate={setSelectedToDate} />
                                    </div>
                                </div>
                                <div id="BtnDelete">
                                    <Button variant='contained' onClick={clearFilters} sx={{ height: '40px', marginRight: '10px' }}>Delete</Button>
                                </div>
                            </div>
                            <div id="SearchSort" className="flex gap-x-[10px] h-[40px]">
                                <SearchBox search={search} handleSearch={handleSearch} />
                                <SortBox sortOrder={sortOrder} handleSortOrder={handleSort} />
                            </div>
                        </div>
                        <div>
                            <PaginatePartners
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                inactive={filter}
                                sort={sortOrder}
                                selectedFromDate={selectedFromDate}
                                selectedToDate={selectedToDate}
                                search={search}
                            />
                        </div>
                    </motion.div>
                </main>
            </div>
        </>
    )
}
export default Partners