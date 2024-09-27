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

export interface ITransactionHistory {
    _id: string;
    title?: string;
    message?: string;
    amount: number;
    status: string;
    type: string;

    currency?: {
      _id: string;
      symbol: string;
      name: string;
    };
    receiver?: {
      _id:string;
      email:string;
    }
    sender?: {
      _id:string;
      email: string;
      full_name:string;
      avatar:string;
    }
    createdAt: string;
    updatedAt?: string

    }
    interface IPaginateDetail extends PaginateProps {
        filterType: string;
        filterStatus: string;
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
                    selectedToFrom: selectedFromDate?.toISOString(),
                    selectedToDate: selectedToDate?.toISOString(),
                    sort:sortOrder,
                    filterType,
                    filterStatus,
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
    
    const DetailUser = (): ITransactionHistory[] => {
        if (!data || !data.transactions) return []
        console.log([])

        return data.transactions.filter((detailUser:ITransactionHistory) => {
            if (!detailUser.createdAt) return false

            const joinDate = new Date (detailUser.createdAt)
            const endDate = selectedToDate ? new Date(selectedToDate): null
            if (endDate) endDate.setHours(23,59,59,999);
            
            const RangeDate = (!selectedFromDate || joinDate >= selectedFromDate) && 
                (!endDate || joinDate <= endDate)
                return (filterType ? detailUser.type.toLowerCase() === filterType.toLowerCase():true) &&
                        (filterStatus ? detailUser.status.toLowerCase() === filterStatus.toLowerCase():true) && RangeDate
        }) .sort ((a:ITransactionHistory,b:ITransactionHistory) => { 
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
        })
    }

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
                        <TableHead className="text-[#1A3E5F] font-bold">Action</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {DetailUser().map((transactions:ITransactionHistory,index:number) => (
                        <TableRow key={index}>
                            <td className="pl-3">{getNumber(index)}</td>
                            <TransactionHistory {...transactions}/>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableFooter>
                    <TableRow>
                            <ReactPaginate
                            className="w-[1280px] flex items-center justify-center gap-x-[10px] fixed"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={3}
                            pageCount={data.pageCount}
                            previousLabel={<IoChevronBackOutline className="size-[16px] text-[#0094FF]" />}
                            pageClassName="inline-block mx-1"
                            pageLinkClassName="py-2 px-4 border rounded-lg text-[#0094FF] hover:bg-gray-200"
                            previousClassName="inline-block"
                            previousLinkClassName="py-2 px-4 text-[#0094FF]"
                            nextLabel={<IoChevronForwardOutline className="size-[16px] text-[#0094FF]" />}
                            nextClassName="inline-block"
                            nextLinkClassName="py-2 px-4 text-[#0094FF]"
                            breakLabel="..."
                            breakClassName="inline-block mx-1"
                            breakLinkClassName="py-2 px-4 border rounded-lg text-[#0094FF] hover:bg-gray-200"
                            containerClassName="flex justify-center py-4"
                            activeClassName="font-bold text-white "
                            activeLinkClassName="font-bold "
                        />
                    </TableRow>
                    </TableFooter>
                </Table>    
        </>
    );
};
export default Paginate