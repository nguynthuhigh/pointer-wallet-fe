import axiosInstance from "@/components/API/axiosInstance"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
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
import ReactPaginate from "react-paginate"
import TransactionHistory from "@/components/transaction/TransactionHistory";
import { ITransactionHistory } from "../Users/paginateDetail";
import { useState } from "react";


const PaginatePartnersDetail = () => {
    const {id} = useParams();
    const [currentPage,setCurrentPage] = useState<number>(1)
    const handlePageClick = (e: {select: number}) => {
        setCurrentPage(e.select + 1)
    }
    const itemsPerPage = 6
    const {data,isLoading,isError} = useQuery({
        queryKey: ['get-details-transactionsPartner'],
        queryFn: async () => {
            const response = await axiosInstance.get(`/api/v1/partner-management/get-transactions`,{
                params: {
                    page:currentPage,
                    page_limit:itemsPerPage,
                    id:id
                }
            })
            return response.data.data;
        }
    })
    console.log(data)
    if(isLoading) return 'Loading...'
    if(isError) return 'Error Fetching Date'

    return (
    <>
        <Table>
                <TableHeader className="uppercase" >
                    <TableRow>
                        <TableHead className="text-[#1A3E5F] font-bold">Messenger</TableHead>
                        <TableHead className="text-[#1A3E5F] font-bold ">Amount</TableHead>
                        <TableHead className="text-[#1A3E5F] font-bold">Join Date</TableHead>
                        <TableHead className="text-[#1A3E5F] font-bold">Status</TableHead>
                        <TableHead className="text-[#1A3E5F] font-bold">Action</TableHead>
                    </TableRow>
                </TableHeader>
        <TableBody>
                    {data.data.map((transactionDetail:ITransactionHistory,index:number) => (
                        <TableRow key={index}>
                            <TransactionHistory {...transactionDetail}/>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableFooter>
                    <TableRow>
                            <ReactPaginate
                            className="w-[1280px] flex items-center justify-center gap-x-[10px] fixed"
                            onPageChange={() => handlePageClick}
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
  )
}

export default PaginatePartnersDetail