import axiosInstance from "@/api/axiosInstance"
import { useQuery } from "@tanstack/react-query"
import {  useParams } from "react-router-dom"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import TransactionHistory from "@/components/transaction/transaction-history";
import PaginateComponents from "../paginate-component/paginate-component";
import { ITransaction } from '@/interfaces/transaction'
import { PaginateProps } from "../customer/paginate-customer";


interface IPaginatePartnerDetail extends PaginateProps {
    filterType: 'all' | 'transfer' | 'deposit' | 'payment' | 'withdraw'
    filterStatus: 'all' | 'completed' | 'fail' | 'pending' | 'refund'
}

type PaginateDetailPick = Pick<IPaginatePartnerDetail, 'currentPage' | 'setCurrentPage' | 'selectedFromDate' | 'selectedToDate' | 'sortOrder' | 'filterType' | 'filterStatus'>

const PaginatePartnersDetail = ({ currentPage, setCurrentPage, selectedFromDate, selectedToDate, sortOrder, filterType, filterStatus }: PaginateDetailPick) => {
    const { id } = useParams();
    const itemsPerPage = 10
    const { data, isLoading, isError } = useQuery({
        queryKey: ['get-details-transactionsPartner', currentPage, selectedFromDate, selectedToDate, sortOrder, filterStatus, filterType],
        queryFn: async () => {
            const response = await axiosInstance.get(`/api/v1/partner-management/get-transactions`, {
                params: {
                    page: currentPage,
                    page_limit: itemsPerPage,
                    sort: sortOrder,
                    status: filterStatus,
                    type: filterType,
                    start: selectedFromDate,
                    end: selectedToDate,
                    id: id
                }
            })
            return response.data.data;
        }
    })
    console.log(data)
    if (isLoading) return 'Loading...'
    if (isError) return 'Error Fetching Data'

    //Handle
    const handlePageClick = (e: { selected: number }) => {
        setCurrentPage(e.selected + 1)
    };
    const getNumber = (index: number) => {
        const customNumber = (currentPage - 1) * itemsPerPage + index + 1
        return customNumber.toString().padStart(2, '0')
    }

    return (
        <>
            <div>
                <Table>
                    <TableHeader className="uppercase sticky" >
                        <TableRow>
                            <TableHead className="text-gray-100 font-bold">No.</TableHead>
                            <TableHead className="text-gray-100 font-bold">Messenger</TableHead>
                            <TableHead className="text-gray-100 font-bold ">Amount</TableHead>
                            <TableHead className="text-gray-100 font-bold">Join Date</TableHead>
                            <TableHead className="text-gray-100 font-bold">Status</TableHead>
                            <TableHead className="text-gray-100 font-bold">Type</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.data.map((transactionDetail: ITransaction, index: number) => (
                            <TableRow key={index}>
                                <td className="pl-3 h-[65px]">{getNumber(index)}</td>
                                <TransactionHistory {...transactionDetail} />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div id="Paginate" className="border-t pt-4">
                <PaginateComponents pageCount={data.pageCount} handlePageClick={handlePageClick} />
            </div>
        </>
    )
}

export default PaginatePartnersDetail