import TransactionHistory, { formatDate } from "../../transaction/TransactionHistory"
import ReactPaginate from 'react-paginate';
import { useQuery } from "@tanstack/react-query";
import axiosInstance from '../../API/axiosInstance';
import { PaginateProps } from "./paginateUser";
import { useParams } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoChevronForwardOutline } from "react-icons/io5";
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
import { ITransaction } from "@/interface/Transaction";

    interface IPaginateDetail extends PaginateProps {
        filterType: 'all' | 'transfer' | 'deposit' | 'payment' | 'withdraw';
        filterStatus: 'all' | 'completed' | 'fail' | 'pending' | 'refund';
     }
    
    type PaginateDetail = Pick<IPaginateDetail, 'currentPage' |'setCurrentPage'| 'selectedFromDate' | 'selectedToDate'  | 'sortOrder' | 'filterType' | 'filterStatus' >
    const itemsPerPage = 8 ;
//Paginate
const Paginate = ({currentPage,setCurrentPage,selectedFromDate,selectedToDate,sortOrder,filterType,filterStatus}: PaginateDetail) => {
    const {id} = useParams();
    const { data , isLoading, isError } = useQuery({
        queryKey: ['transactions', currentPage,selectedFromDate,selectedToDate,sortOrder,filterType,filterStatus],
        queryFn: async () => {
            const response = await axiosInstance.get(`/api/v1/user/get-transactions`,{
                params:{
                    page:currentPage,
                    page_limit:itemsPerPage,
                    start: selectedFromDate?.toISOString(),
                    end: selectedToDate?.toISOString(),
                    sort:sortOrder,
                    type:filterType,
                    status:filterStatus,
                    id:id,
                }
            });
            return response.data.data
        },
    });
    console.log(data)

    if(isLoading){
        return <div>Loading</div>
    } 
    if(isError){
        return <div>Error</div>
    }
    console.log(data.transactions)
    
    const handlePageClick = (e: { selected: number }) => {
        setCurrentPage(e.selected + 1)
    };
    const getNumber = (index:number) => {
        const customNumber = (currentPage - 1) * itemsPerPage + index + 1
        return customNumber.toString().padStart(2,'0')
    }
    
    // const DetailUser = (): ITransaction[] => {
    //     if (!data || !data.transactions) return []
    //     console.log([])

    //     return data.transactions.filter((detailUser:ITransaction) => {
    //         if (!detailUser.createdAt) return false

    //         const joinDate = new Date (detailUser.createdAt)
    //         const endDate = selectedToDate ? new Date(selectedToDate): null
    //         if (endDate) endDate.setHours(23,59,59,999);
            
    //         const RangeDate = (!selectedFromDate || joinDate >= selectedFromDate) && 
    //             (!endDate || joinDate <= endDate)
    //             return (filterType ? detailUser.type.toLowerCase() === filterType.toLowerCase():true) &&
    //                     (filterStatus ? detailUser.status.toLowerCase() === filterStatus.toLowerCase():true) && RangeDate
    //     }) .sort ((a:ITransaction,b:ITransaction) => { 
    //         const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
    //         const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
    //         return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
    //     })
    // }

    return (    
        <>   
                <Table>
                    <TableHeader className="uppercase" >
                    <TableRow>
                        <TableHead className="text-[#1A3E5F] font-bold">No.</TableHead>
                        <TableHead className="text-[#1A3E5F] font-bold">Messenger</TableHead>
                        <TableHead className="text-[#1A3E5F] font-bold ">Amount</TableHead>
                        <TableHead className="text-[#1A3E5F] font-bold">Join Date</TableHead>
                        <TableHead className="text-[#1A3E5F] font-bold">Status</TableHead>
                        <TableHead className="text-[#1A3E5F] font-bold">Type</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {data.transactions.map((transactions:ITransaction,index:number) => (
                        <TableRow key={index}>
                            <td className="pl-3">{getNumber(index)}</td>
                            <TransactionHistory {...transactions}/>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableFooter>
                    <TableRow>
                        <PaginateComponents pageCount={data.pageCount} handlePageClick={handlePageClick}/>
                    </TableRow>
                    </TableFooter>
                </Table>    
        </>
    );
};
export default Paginate