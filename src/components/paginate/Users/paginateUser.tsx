import axiosInstance from "../../API/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import AvatarDefault from '../../../assets/png/Avatar.png';
import { formatDate } from "../../transaction/TransactionHistory";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import PaginateComponents from "../paginateComponent/PaginateComponents";
import {IUser} from '../../../interface/User';
import { useState } from "react";

    export interface PaginateProps extends IUser  {
        currentPage: number,
        setCurrentPage: (page:number) => void
        selectedFromDate: Date | null
        selectedToDate: Date | null
        search: string;
        sortOrder: 'asc' | 'desc';
    }
    type PickPaginate = Pick<PaginateProps, 'currentPage' | 'setCurrentPage' | 'search' | 'inactive' | 'sortOrder' | 'selectedFromDate' | 'selectedToDate'>

    const itemsPerPage = 8;
    export const PaginateUser = ({currentPage,setCurrentPage,search,inactive,sortOrder,selectedFromDate,selectedToDate}:PickPaginate) => {
        const { data, isLoading, isError } = useQuery({
            queryKey: ['users',  currentPage, inactive, sortOrder, selectedFromDate, selectedToDate,search],
            queryFn: async () => {
                const response = await axiosInstance.get(`/api/v1/user/get-users`,{
                    params: {
                        page:currentPage,
                        page_limit: itemsPerPage,
                        inactive:inactive,
                        search,
                        sort:sortOrder,
                        start: selectedFromDate?.toISOString(),
                        end: selectedToDate?.toISOString(),
                    }
                }           
                )
                return response.data.data
            },
            
            
        });
        
        console.log(data)
        const navigate = useNavigate();
        const handleUserClick = (user: IUser,customID:string,nameID:string) => {
            const { _id = '', avatar, full_name, email, createdAt, inactive } = user;
            navigate(`/listUser/detailListUser/${_id}`, { state: {customID,nameID, avatar, full_name, email, createdAt, inactive } });
        };
        
        const handleClickPage = (e: { selected: number }) => {
            setCurrentPage(e.selected + 1);
        };

        if (isLoading) return 'Loading...'
        if (isError) return 'Error Fetching Data'


        const Users = data.data
        .filter((user: IUser) => {
            // const joinDate = new Date(user.createdAt);
            // const endDate = selectedToDate ? new Date(selectedToDate) : null;
            
            // // Set endDate to the end of the selected day
            // if (endDate) {
            //     endDate.setHours(23, 59, 59, 999);
            // }

            // const withinDateRange = 
            //     (!selectedFromDate || joinDate >= selectedFromDate) &&
            //     (!endDate || joinDate <= endDate);
            
            const nameOrEmailMatch = 
                user.full_name?.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase());

            return nameOrEmailMatch;
        })
        const getID = (index:number) => {
            const customID =  (currentPage - 1) * itemsPerPage + index + 1;
            return `${customID.toString().padStart(2,'0')}`
        }
        const getNameID = (user: IUser) => {
            if (user.full_name)
                return user.full_name
            return `U${user._id.slice(-4)}`
        }
    
        return (
            <Table>
            <TableHeader className="uppercase" >
            <TableRow>
                <TableHead className="text-[#1A3E5F] font-bold">No.</TableHead>
                <TableHead className="text-[#1A3E5F] font-bold">Photo</TableHead>
                <TableHead className="text-[#1A3E5F] font-bold ">Name</TableHead>
                <TableHead className="text-[#1A3E5F] font-bold">Email</TableHead>
                <TableHead className="text-[#1A3E5F] font-bold">Join Date</TableHead>
                <TableHead className="text-[#1A3E5F] font-bold">Status</TableHead>
                <TableHead className="text-[#1A3E5F] font-bold">Action</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {Users.map((users:IUser,index:number) => (
                <TableRow key={index} >
                    <TableCell className="font-bold">{getID(index)}</TableCell>
                    <TableCell className="font-medium">{users.avatar
                    ? <img src = {users.avatar} className="rounded-full h-[40px] w-[40px] object-cover"/>   
                    : <img src = {AvatarDefault} className="rounded-full h-[40px] w-[40px] object-cover"/>}</TableCell>
                    <TableCell>{getNameID(users)}</TableCell>
                    <TableCell>{users.email}</TableCell>
                    <TableCell> {formatDate(users.createdAt)}</TableCell>
                    <TableCell className={`w-fit ${!users.inactive ? 'text-[#027A48] bg-[#ECFDF3]' : 'bg-[#FFE3E3] text-[#FF1717]'} h-[30px] mt-4 px-[8px] rounded-[16px] flex items-center`}
                    >   <GoDotFill className="ml-[6px] mr-[4px]" />
                        <div className="mr-[8px] font-bold">
                            {!users.inactive ? 'Active' : 'Inactive'}
                        </div>
                    </TableCell>
                    <TableCell key={users._id} onClick={() => handleUserClick(users,getID(index),getNameID(users))} className="text-[#0094FF] font-bold hover:transition-all hover:-translate-y-2 duration-300 cursor-pointer">View Profile</TableCell>
                </TableRow>
            ))}
            {/* <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-3">
                {Users.map((user: IDataItem) => (
                    <UserCard key={user._id} {...user} />
                ))}
            </div> */}
            </TableBody>
            <TableFooter>
            <TableRow>
                <PaginateComponents pageCount={data.pageCount} handlePageClick={handleClickPage}/>
            </TableRow>
            </TableFooter>
        </Table>
        );
    };
