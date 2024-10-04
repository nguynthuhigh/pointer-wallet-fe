import { useState } from "react"
import { FilterBox } from "../../components/Box/FilterBox/filterBox"
import SideBar from "../../components/sidebar/sidebar"
import { DateFrom } from "../../components/Date/DateFrom/dateFrom"
import { DateTo } from "../../components/Date/DateTo/dateTo"
import { SearchBox } from "../../components/Box/SearchBox/searchBox"
import { SortBox } from "../../components/Box/SortBox/sortBox"
import { PaginatePartners } from "@/components/paginate/PartnersP/paginatePartners"
import { Button } from "@mui/material"

const Partners = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filter,setFilter] = useState<'all' | 'false' | 'true'>('all')
    const [selectedFromDate,setSelectedFromDate] = useState<Date | null>(null)
    const [selectedToDate,setSelectedToDate] = useState<Date | null>(null);
    const [search,setSearch] = useState<string>('')
    const [sortOrder,setSortOrder] = useState<'asc' | 'desc'>('desc')


    //handle
    const handleFilterChange = (newFilter: 'all' | 'false' | 'true') => {
        setFilter(newFilter)
    }
    const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
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
            <div className="flex w-full h-screen">
            <div className='hidden sm:hidden lg:block'>   
                <SideBar state={"Partners"}/>
            </div>
            <div className="flex-1 flex flex-col ml-[230px] mr-[20px]">
                <div id="Title" className="text-[36px] font-bold ">Partners Management</div>
                <div id="TitleDetail" className="text-[17px] flex text-[#0094FF] pb-[10px]">Manage your service partners and find all platform partners here!</div>
                <div className="flex items-center justify-between">
                    <div className="flex text-base py-[10px] gap-x-[20px] cursor-pointer">
                        <div id='FilterBox' className="relative flex justify-center">
                            <FilterBox filter={filter} handleFilterChange={handleFilterChange}/>
                        </div>
                        <div className="relative z-20"> 
                            <div id="FromDate">
                                <DateFrom selectedFromDate={selectedFromDate} setSelectedFromDate={setSelectedFromDate}/>
                            </div>
                        </div>
                        <div className='relative z-20'>
                            <div id="ToDate" className=" relative">
                                <DateTo selectedToDate={selectedToDate} setSelectedToDate={setSelectedToDate}/>
                            </div>
                        </div>
                        <div id="BtnDelete">
                            <Button variant='contained' onClick={clearFilters}  sx={{height: '36', marginRight: '10px'}}>Delete</Button>
                        </div>
                    </div>
                    <div id="SearchSort" className="flex gap-x-[10px] h-[36px]">
                        <SearchBox search={search} handleSearch={handleSearch}/>
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
            </div>
        </div>
        </>
    )
}
export default Partners