import axiosInstance from "@/components/API/axiosInstance"
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
import { ITransaction } from "@/interface/transaction"
import TransactionHistory from "@/components/transaction/TransactionHistory"
import { useNavigate } from "react-router-dom"

export const PaginateTransactions = () => {
    const navigate = useNavigate()
    const { data, isLoading, isError } = useQuery({
        queryKey: ['transactions'],
        queryFn: async () => {
            const response = await axiosInstance.get(`/api/v1/admin/get-transactions`, {
                params: {
                    page: 1,
                    page_limit: 20
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
                            <TableHead className="text-[#1A3E5F] font-bold">Type</TableHead>
                            <TableHead className="text-[#1A3E5F] font-bold">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((transactions: ITransaction, index: number) => (
                            <TableRow key={index}>
                                <td className="pl-3">{getID(index)}</td>
                                <TransactionHistory {...transactions}/>
                                <td key={transactions._id} onClick = {() => handleClick(transactions)} className="pl-3 text-[#0094FF] font-bold hover:transition-all hover:-translate-y-2 duration-300 cursor-pointer">View Detail</td>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {/* <div id='Paginate'>
                <PaginateComponents pageCount={data.pageCount} handlePageClick={handleClickPage} />
            </div> */}
        </>
    )
}

