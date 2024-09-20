import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import UserRow, { UserProps } from "../components/user/User";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../components/API/axiosInstance";
import { useQuery } from '@tanstack/react-query';
import { CgSortAz, CgSortZa } from "react-icons/cg";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import SideBar from "../components/sidebar/sidebar";
import { Button } from '@mui/material';
import UserCard from '../components/user/user_card';
import { SearchBox } from '../components/Box/SearchBox/searchBox'
import { SortBox } from '../components/Box/SortBox/sortBox'

const fetchUsers = async () => {
    try {
        const response = await axiosInstance.get('get-users', {  
            params: {
                page: 1,
                page_limit: 100,
            }
        });
        console.log("API Response:", response.data);
        return response.data.data.data || [];
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export default function ListUser() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const [filter, setFilter] = useState<'all' | false | true>('all');
    const [selectedFromDate, setSelectedFromDate] = useState<Date | null>(null);
    const [selectedToDate, setSelectedToDate] = useState<Date | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const handleSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const { data: users = [], isLoading, isError } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });

    useEffect(() => {
        const storedSearch = localStorage.getItem('search') || '';
        const storedFilter = localStorage.getItem('filter') || 'all';
        const storedFromDate = localStorage.getItem('selectedFromDate');
        const storedToDate = localStorage.getItem('selectedToDate');
        const storedSortOrder = localStorage.getItem('sortOrder') || 'desc';
        const storedCurrentPage = Number(localStorage.getItem('currentPage')) || 1;

        setSearch(storedSearch);
        setFilter(storedFilter as 'all' | false | true);
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

    // Filter and Sort Users
    const sortedUsers = users
    .filter((user: UserProps) => {
        const joinDate = new Date(user.createdAt);
        const endDate = selectedToDate ? new Date(selectedToDate) : null;
        
        // Set endDate to the end of the selected day
        if (endDate) {
            endDate.setHours(23, 59, 59, 999);
        }

        const withinDateRange = 
            (!selectedFromDate || joinDate >= selectedFromDate) &&
            (!endDate || joinDate <= endDate);
        
        const statusMatch = filter === 'all' || (filter === false ? !user.inactive : user.inactive);
        
        const nameOrEmailMatch = 
            user.full_name?.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase());

        return withinDateRange && statusMatch && nameOrEmailMatch;
    })
    .sort((a: UserProps, b: UserProps) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });


    // Pagination
    const personOfPage = 10;
    const totalPages = Math.ceil(sortedUsers.length / personOfPage);
    const startPage = (currentPage - 1) * personOfPage;
    const currentUser = sortedUsers.slice(startPage, startPage + personOfPage);

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleFilterChange = (newFilter: 'all' | false | true) => {
        setFilter(newFilter);
        setCurrentPage(1); 
    };
    

    

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data...</div>;

    return (
        <div className="flex w-full h-screen font-poppins">
            <div className='hidden sm:hidden lg:block'>   
                <SideBar state={"Customers"}/>
            </div>
            <div className="flex-1 flex flex-col lg:ml-[20px] lg:mr-[20px]">
                <div id="Title" className="text-[36px] font-bold mt-[10px]">Customers</div>
                <div id="TitleDetail" className="text-[20px] flex text-[#0094FF]">Find all platform customers here!</div>
                <div className="flex items-center justify-between">
                    <div className="flex text-base mb-[20px] mt-[20px] gap-x-[20px] cursor-pointer">
                        <div id='FilterBox' className=" relative flex justify-center">
                            <select
                                value={filter === 'all' ? 'all' : filter === true ? 'active' : 'inactive'}
                                onChange={(e) => handleFilterChange(e.target.value === 'all' ? 'all' : e.target.value === 'active' ? true : false)}
                                className="border-[1px] p-1 rounded-[4px] border-gray-300 h-[36px] w-full text-sm outline-none appearance-none pl-[15px] pr-[15px]" 
                            >
                                <option value="all">All</option>
                                <option value="inactive">Active</option>
                                <option value="active">Inactive</option>
                            </select>
                            <span className=' absolute top-[-0.5rem] left-[32px] bg-white text-[#0094FF] transform -translate-x-1/2 text-sm'>Filter</span>
                        </div>
                        <div className="relative z-20"> 
                            <div id="From">
                                <DatePicker
                                    selected={selectedFromDate}
                                    onChange={(date) => setSelectedFromDate(date)}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText='yyyy/mm/dd'
                                    className={`border-[1px] p-1 rounded-[4px] border-gray-300 w-full h-[36px] text-center text-sm`}
                                />
                                <span className=' absolute top-[-0.5rem] left-[35px] bg-white text-[#0094FF] text-sm transform -translate-x-1/2'>From:</span>
                            </div>
                        </div>
                        <div className='relative z-20'>
                            <div id="To" className=" relative">
                                <DatePicker
                                    selected={selectedToDate}
                                    onChange={(date) => setSelectedToDate(date)}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText='yyyy/mm/dd'
                                    className="border-[1px] p-1 rounded-[4px] border-gray-300 w-full text-center h-[36px] text-sm outline-none appearance-none"
                                />
                                <span className=' absolute top-[-0.5rem] left-[30px] transform -translate-x-1/2 bg-white text-[#0094FF] px-1 text-sm'>To:</span>
                            </div>
                        </div>
                        <Button variant='contained' onClick={clearFilters} sx={{height: '36', marginRight: '10px'}}>Delete</Button>
                    </div>
                    <div id="SearchSort" className="flex gap-x-[10px] h-[36px]">
                        <SearchBox search={search} handleSearch={(e:React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />
                        <SortBox sortOrder={sortOrder} handleSortOrder={(handleSortOrder)}/>
                    </div>
                </div>

                <div className="max-h-[700px] overflow-y-auto scrollbar-hide lg:border-2 rounded-2xl">
                    <table className="w-full table-fixed border-collapse rounded-2xl overflow-hidden ">
                        <thead className="sticky top-0 bg-[#F1F4F9] text-[#000000] text-base z-10 hidden lg:table-header-group">
                            <tr>
                                <th className="w-20 text-left pl-4 pt-[10px] pb-[10px] h-[50px]">PHOTO</th>
                                <th className="w-20 text-left pl-4 pt-[10px] pb-[10px]">NAME</th>
                                <th className="w-20 text-left pl-4 pt-[10px] pb-[10px]">EMAIL</th>
                                <th className="w-20 text-left pl-4 pt-[10px] pb-[10px] ">JOIN DATE</th>
                                <th className="w-20 text-left pl-4 pt-[10px] pb-[10px] ">STATUS</th>
                                <th className="w-20 text-left pl-4 pt-[10px] pb-[10px] ">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUser.map((user: UserProps) => (
                                <UserRow {...user} />
                            ))}                            
                        </tbody>
                    </table>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-3">
                        {currentUser.map((user: UserProps) => (
                            <UserCard key={user._id} {...user} />
                        ))}
                    </div>

                </div>
                <div id="PreNextBar" className="fixed bottom-0 right-0 left-0 flex justify-end items-center mt-[50px] gap-x-[10px] py-[10px] mr-[40px]">
                    <div id="RowsOfPage" className="flex gap-x-[8px] text-base font-semibold mr-[20px]">
                        <div id="content">Rows per page:</div>
                        <div id="quantityRows">{personOfPage}</div>
                    </div>
                    <div id="dot" className="flex flex-nowrap overflow-x-auto gap-[8px] text-base font-semibold">
                        {currentPage} of {totalPages}
                    </div>
                    <button id="left" className="cursor-pointer" onClick={handlePreviousPage}><IoIosArrowBack /></button>
                    <button id="right" className="cursor-pointer" onClick={handleNextPage}><IoIosArrowForward /></button>
                </div>
            </div>
        </div>
    );
}
