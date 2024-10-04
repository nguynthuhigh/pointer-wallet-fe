import { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import SideBar from "../../components/sidebar/sidebar";
import { Button } from '@mui/material';
import { SearchBox } from '../../components/Box/SearchBox/searchBox'
import { SortBox } from '../../components/Box/SortBox/sortBox'
import { FilterBox } from '../../components/Box/FilterBox/filterBox';
import { DateFrom } from '../../components/Date/DateFrom/dateFrom';
import { DateTo } from '../../components/Date/DateTo/dateTo';
import { PaginateUser } from '@/components/paginate/Users/paginateUser';

export default function ListUser() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const [filter, setFilter] = useState<'all' | 'false' | 'true'>('all');
    const [selectedFromDate, setSelectedFromDate] = useState<Date | null>(null);
    const [selectedToDate, setSelectedToDate] = useState<Date | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    
    const handleFilterChange = (newFilter: 'all' | 'false' | 'true') => {
        setFilter(newFilter);
    };

    const handleSortOrder = () => {
        setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
  
    useEffect(() => {
        const storedSearch = localStorage.getItem('search') || '';
        const storedFilter = localStorage.getItem('filter') || 'all';
        const storedFromDate = localStorage.getItem('selectedFromDate');
        const storedToDate = localStorage.getItem('selectedToDate');
        const storedSortOrder = localStorage.getItem('sortOrder') || 'desc';
        const storedCurrentPage = Number(localStorage.getItem('currentPage')) || 1;

        setSearch(storedSearch);
        setFilter(storedFilter as 'all' | 'false' | 'true');
        setSelectedFromDate(storedFromDate ? new Date(storedFromDate) : null);
        setSelectedToDate(storedToDate ? new Date(storedToDate) : null);
        setSortOrder(storedSortOrder as 'asc' | 'desc');
        setCurrentPage(storedCurrentPage);
    }, []);

    useEffect(() => {
        localStorage.setItem('search', search);
        localStorage.setItem('filter', filter === 'all' ? 'all' : filter ? 'true' : 'false');
        localStorage.setItem('selectedFromDate', selectedFromDate?.toISOString() || '');
        localStorage.setItem('selectedToDate', selectedToDate?.toISOString() || '');
        localStorage.setItem('sortOrder', sortOrder);
        localStorage.setItem('currentPage', currentPage.toString());
    }, [search, filter, selectedFromDate, selectedToDate, sortOrder, currentPage]);

    // Clear Filters
    const clearFilters = () => {
        setSearch('');
        setFilter('all');
        setSelectedFromDate(null);
        setSelectedToDate(null);
        localStorage.removeItem('search');
        localStorage.removeItem('filter');
        localStorage.removeItem('selectedFromDate');
        localStorage.removeItem('selectedToDate');
    };

    return (
        <div className="flex w-full">
            <div className='hidden sm:hidden lg:block'>   
                <SideBar state={"Users"}/>
            </div>
            <div className="flex-1 flex flex-col mr-[20px] ml-[230px] h-screen">
                <div id="Title" className="text-[36px] font-bold ">Users Management</div>
                <div id="TitleDetail" className="text-[17px] flex text-[#0094FF] pb-[10px]">Find all platform users here!</div>
                <div className="flex items-center justify-between pb-[10px]">
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
                        <Button variant='contained' onClick={clearFilters} sx={{height: '36', marginRight: '10px'}}>Delete</Button>
                    </div>
                    <div id="SearchSort" className="flex gap-x-[10px] h-[36px]">
                        <SearchBox search={search} handleSearch={handleSearch} />
                        <SortBox sortOrder={sortOrder} handleSortOrder={(handleSortOrder)}/>
                    </div>
                </div>
                <div>
                    <PaginateUser
                    inactive = {filter}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    selectedFromDate={selectedFromDate}
                    selectedToDate={selectedToDate}
                    search={search}
                    sortOrder={sortOrder}
                    />
                </div>
            </div>
        </div>
    );
}
