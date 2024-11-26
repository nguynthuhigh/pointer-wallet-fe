import { useState, useEffect } from 'react';
import { SearchBox } from '../../components/box/box-search'
import { SortBox } from '../../components/box/box-sort'
import { FilterBox } from '../../components/box/box-filter';
import { DateFrom } from '../../components/date/date-from';
import { PaginateUser } from '@/components/paginate/customer/paginate-customer';
import { HeaderComponent } from '@/components/header/header';
import { motion } from 'framer-motion'
import { DateTo } from '@/components/date/date-to';
import { AreaCard } from '@/components/chart/area-card';
import { User, UserPlus, UserRoundCheck, UserRoundX } from 'lucide-react';
// import { CustomerChartGrow } from '@/components/chart/customer-chart';
import { useQuery } from '@tanstack/react-query';
import { IGetCustomerAnalyst } from '@/interfaces/analyst';
import { getCustomerAnalyst } from '@/api/analyst.api';
import { DeleteBox } from '@/components/box/box-delete';
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
        setSearch(e.target.value)
    }
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

    const { data: Customer, isLoading, isError } = useQuery<IGetCustomerAnalyst>({
        queryKey: ['get-customer-analyst'],
        queryFn: () => getCustomerAnalyst()
    })
    if (isLoading) return 'Loading...'
    if (isError) return 'Fetching data error'

    return (
        <div className='flex-1 mx-auto h-screen overflow-auto'>
            <HeaderComponent title='Customers Management' />
            <main className='max-w-7xl mx-auto py-6 px-4 space-y-6'>
                <motion.div
                    className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <AreaCard
                        name='Total Customers'
                        icon={User}
                        value={Customer?.totalCustomer || 0}
                        color='#3b82f6'
                    />
                    <AreaCard
                        name='New Customers today'
                        icon={UserPlus}
                        value={Customer?.totalCustomerToday || 0}
                        color='#10b981'
                    />
                    <AreaCard
                        name='Active Customers'
                        icon={UserRoundCheck}
                        value={Customer?.totalCustomerActive || 0}
                        color='#f59e0b'
                    />
                    <AreaCard
                        name='Inactive Customers'
                        icon={UserRoundX}
                        value={Customer?.totalCustomerInactive || 0}
                        color='#ec4899'
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="bg-gray-800 backdrop-opacity-70 backdrop-blur-md border border-gray-700 px-5 py-1 rounded-[6px] relative z-20"
                >
                    <div className='flex flex-col space-y-[10px]'>
                        <FilterBox
                            filter={filter}
                            handleFilterChange={handleFilterChange}
                        />
                        <div className='flex space-x-[10px]'>
                            <DateFrom
                                selectedFromDate={selectedFromDate}
                                setSelectedFromDate={setSelectedFromDate}
                            />
                            <DateTo
                                selectedToDate={selectedToDate}
                                setSelectedToDate={setSelectedToDate}
                            />
                        </div>
                        <div className='flex space-x-[10px] py-[10px]'>
                            <SearchBox
                                search={search}
                                handleSearch={handleSearch}
                            />
                            <SortBox
                                sortOrder={sortOrder}
                                handleSortOrder={(handleSortOrder)}
                            />
                            <DeleteBox
                                clearFilters={clearFilters}
                            />
                        </div>
                    </div>

                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className='bg-gray-800 px-5 py-4 rounded-[6px] border border-gray-700 relative z-10'>
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
                {/* <div>
                    <CustomerChartGrow/>
                </div> */}
            </main>
        </div >
    );
}
