import { useState } from "react"
import { FilterBox } from "../../components/box/box-filter"
import { DateFrom } from "../../components/date/date-from"
import { DateTo } from "../../components/date/date-to"
import { SearchBox } from "../../components/box/box-search"
import { SortBox } from "../../components/box/box-sort"
import { PaginatePartners } from "@/components/paginate/partner/paginate-partner"
import { HeaderComponent } from "@/components/header/header"
import { motion } from 'framer-motion'
import { AreaCard } from "@/components/chart/area-card"
import { User, UserPlus, UserRoundCheck, UserRoundX } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { IGetPartnerAnalyst } from "@/interfaces/analyst"
import { getPartnerAnalyst } from "@/api/analyst.api"
const Partners = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filter, setFilter] = useState<'all' | 'false' | 'true'>('all')
    const [selectedFromDate, setSelectedFromDate] = useState<Date | null>(null)
    const [selectedToDate, setSelectedToDate] = useState<Date | null>(null);
    const [search, setSearch] = useState<string>('')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

    const {data:Partner,isLoading,isError} = useQuery<IGetPartnerAnalyst>({
        queryKey: ['get-partner-analyst'],
        queryFn: () => getPartnerAnalyst()
    })
    if (isLoading) return 'Loading...'
    if (isError) return 'Fetching data error'
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
                <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
                    <motion.div
                        className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5,delay:0.2 }}
                    >
                        <AreaCard
                            name='Total Partners'
                            icon={User}
                            value={Partner?.totalPartner || 0}
                            color='#3b82f6'
                        />
                        <AreaCard
                            name='New Partners today'
                            icon={UserPlus}
                            value={Partner?.totalPartnerToday.total || 0}
                            color='#10b981'
                        />
                        <AreaCard
                            name='Active Partners'
                            icon={UserRoundCheck}
                            value={Partner?.totalPartnerActive || 0}
                            color='#f59e0b'
                        />
                        <AreaCard
                            name='Inactive Partners'
                            icon={UserRoundX}
                            value={Partner?.totalPartnerInactive || 0}
                            color='#ec4899'
                        />
                    </motion.div>
                    <motion.div
                        className="bg-gray-800 backdrop-opacity-70 backdrop-blur-md border border-gray-700 px-5 py-1 rounded-[6px] relative z-20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                    >
                        <div className="flex items-center justify-between pb-[10px]">
                            <div className="flex items-end text-base gap-x-[20px] py-[10px] cursor-pointer w-full">
                                <div id='FilterBox' className="relative flex justify-center">
                                    <FilterBox filter={filter} handleFilterChange={handleFilterChange} />
                                </div>
                                <div id="FromDate">
                                    <DateFrom selectedFromDate={selectedFromDate} setSelectedFromDate={setSelectedFromDate} />
                                </div>
                                <div id="ToDate">
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
                                    <SortBox sortOrder={sortOrder} handleSortOrder={handleSort} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="bg-gray-800 backdrop-opacity-70 backdrop-blur-md border border-gray-700 px-5 py-4 rounded-[6px] relative z-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.2 }}

                    >
                        <PaginatePartners
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            inactive={filter}
                            sort={sortOrder}
                            selectedFromDate={selectedFromDate}
                            selectedToDate={selectedToDate}
                            search={search}
                        />
                    </motion.div>
                </main>
            </div>
        </>
    )
}
export default Partners