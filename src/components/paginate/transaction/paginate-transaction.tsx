import axiosInstance from "@/api/axiosInstance"
import { useQuery } from "@tanstack/react-query"
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ITransaction } from "@/interfaces/transaction"
import TransactionHistory from "@/components/transaction/transaction-history"
import { useNavigate } from "react-router-dom"
import PaginateComponents from "../paginate-component/paginate-component"

interface ITransactionPage {
    currentPage: number
    setCurrentPage: (page:number) => void
    filterType: 'all' | 'transfer' | 'deposit' | 'payment' | 'withdraw'
    filterStatus: 'all' | 'completed' | 'fail' | 'pending' | 'refund'
    selectedFromDate: Date | null
    selectedToDate: Date | null
    sortOrder: 'asc' | 'desc'
}


export const PaginateTransactions = ({currentPage,setCurrentPage,filterStatus,filterType,selectedFromDate,selectedToDate,sortOrder}: ITransactionPage) => {
    const navigate = useNavigate()
    const itemsPerPage = 10;
    const { data, isLoading, isError } = useQuery({
        queryKey: ['transactions',currentPage,setCurrentPage,filterStatus,filterType,selectedFromDate,selectedToDate,sortOrder],
        queryFn: async () => {
            const response = await axiosInstance.get(`/api/v1/admin/get-transactions`, {
                params: {
                    page: currentPage,
                    page_limit: itemsPerPage,
                    status: filterStatus,
                    type: filterType,
                    start: selectedFromDate,
                    end: selectedToDate,
                    sort: sortOrder
                }
            })
            return response.data.data
        }
    })
    console.log(data)
    if (isLoading) return 'Loading...'
    if (isError) return 'Fetching Data Error'

    const handleClick = (transactions: ITransaction) => {
        const { _id } = transactions
        navigate(`/transaction-list/detail/${_id}`)
    }

    const getID = (index: number) => {
        const customID = (1 - 1) * 10 + index + 1
        return `${customID.toString().padStart(2,'0')}`
    }
    const handleClickPage = (e: {selected: number}) => {
        setCurrentPage(e.selected + 1)
    }
    return (
        <>
            <div>
                <Table>
                    <TableHeader className="uppercase" >
                        <TableRow>
                            <TableHead className="text-[#1A3E5F] font-bold">No.</TableHead>
                            <TableHead className="text-[#1A3E5F] font-bold">Message</TableHead>
                            <TableHead className="text-[#1A3E5F] font-bold ">Amount</TableHead>
                            <TableHead className="text-[#1A3E5F] font-bold">Status</TableHead>
                            <TableHead className="text-[#1A3E5F] font-bold">Join Date</TableHead>
                            <TableHead className="text-[#67727c] font-bold">Type</TableHead>
                            <TableHead className="text-[#1A3E5F] font-bold">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.transactions.map((transactions: ITransaction, index: number) => (
                            <TableRow key={index}>
                                <td className="pl-3">{getID(index)}</td>
                                <TransactionHistory {...transactions}/>
                                <td key={transactions._id} onClick = {() => handleClick(transactions)} className="pl-3 text-[#0094FF] font-bold hover:transition-all hover:-translate-y-2 duration-300 cursor-pointer">View Detail</td>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div id='Paginate'>
                <PaginateComponents pageCount={data.pageCount} handlePageClick={handleClickPage} />
            </div>
        </>
    )
}

