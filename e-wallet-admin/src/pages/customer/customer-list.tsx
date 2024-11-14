import { useState, useEffect } from 'react';
import { SearchBox } from '../../components/box/box-search'
import { SortBox } from '../../components/box/box-sort'
import { FilterBox } from '../../components/box/box-filter';
import { DateFrom } from '../../components/date/date-from';
import { PaginateUser } from '@/components/paginate/customer/paginate-customer';
import { HeaderComponent } from '@/components/header/header';
import { motion } from 'framer-motion'
import { DateTo } from '@/components/date/date-to';
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
        <div className='flex-1 mx-auto h-screen overflow-auto'>
            <HeaderComponent title='Customers Management' />
            <main className='max-w-7xl mx-auto py-6 px-4 space-y-6'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="bg-gray-800 backdrop-opacity-70 backdrop-blur-md px-5 py-1 rounded-[6px] relative z-20"
                >
                    <div>
                        <div className="flex items-center justify-between pb-[10px] ">
                            <div className="flex items-end text-base py-[10px] gap-x-[20px] cursor-pointer w-full ">
                                <div id='FilterBox' className=" flex justify-center text-black">
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
                                    <SortBox sortOrder={sortOrder} handleSortOrder={(handleSortOrder)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className='bg-gray-800 px-5 py-4 rounded-[6px] relative z-10'>
                    <PaginateUser
                        inactive={filter}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        selectedFromDate={selectedFromDate}
                        selectedToDate={selectedToDate}
                        search={search}
                        sortOrder={sortOrder}
                    />
                </motion.div>
            </main>
        </div>
    );
}
