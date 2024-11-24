import TransactionHistory from "../../transaction/transaction-history"
import { useQuery } from "@tanstack/react-query";
import axiosInstance from '../../../api/axiosInstance';
import { PaginateProps } from "./paginate-customer";
import { useNavigate, useParams } from "react-router-dom";

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import PaginateComponents from "../paginate-component/paginate-component";
import { ITransaction } from "@/interfaces/transaction";

interface IPaginateDetail extends PaginateProps {
    filterType: 'all' | 'transfer' | 'deposit' | 'payment' | 'withdraw';
    filterStatus: 'all' | 'completed' | 'fail' | 'pending' | 'refund';
}

type PaginateDetail = Pick<IPaginateDetail, 'currentPage' | 'setCurrentPage' | 'selectedFromDate' | 'selectedToDate' | 'sortOrder' | 'filterType' | 'filterStatus'>
const itemsPerPage = 10;
//Paginate
const Paginate = ({ currentPage, setCurrentPage, selectedFromDate, selectedToDate, sortOrder, filterType, filterStatus }: PaginateDetail) => {

    const { id } = useParams();
    const navigate = useNavigate()

    const { data, isLoading, isError } = useQuery({
        queryKey: ['transactions', currentPage, selectedFromDate, selectedToDate, sortOrder, filterType, filterStatus],
        queryFn: async () => {
            const response = await axiosInstance.get(`/api/v1/user/get-transactions`, {
                params: {
                    page: currentPage,
                    page_limit: itemsPerPage,
                    start: selectedFromDate?.toISOString(),
                    end: selectedToDate?.toISOString(),
                    sort: sortOrder,
                    type: filterType,
                    status: filterStatus,
                    id: id,
                }
            });
            return response.data.data
        },
    });
    console.log(data)
    if (isLoading) {
        return <div>Loading</div>
    }
    if (isError) {
        return <div>Error</div>
    }
    console.log(data.transactions)

    const handleTransactionDetail = (id:string) => {
        console.log(id)
        navigate(`/transaction-list/detail/${id}`)
    }
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
                    <TableHeader className="uppercase" >
                        <TableRow>
                            <TableHead className="text-gray-100 font-bold">No.</TableHead>
                            <TableHead className="text-gray-100 font-bold">Messenger</TableHead>
                            <TableHead className="text-gray-100 font-bold ">Amount</TableHead>
                            <TableHead className="text-gray-100 font-bold">Status</TableHead>
                            <TableHead className="text-gray-100 font-bold">Join Date</TableHead>
                            <TableHead className="text-gray-100 font-bold">Type</TableHead>
                            <TableHead className="text-gray-100 font-bold">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.transactions.map((transactions: ITransaction, index: number) => (
                            <TableRow key={index}>
                                <td className="pl-3 h-[65px]">{getNumber(index)}</td>
                                <TransactionHistory {...transactions} />
                                <td key={transactions._id} onClick={() => handleTransactionDetail(transactions._id)} className="text-[#0094FF] font-bold hover:transition-all hover:-translate-y-2 duration-300 cursor-pointer">View Detail</td>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div id="Paginate" className="border-t pt-4">
                    <PaginateComponents pageCount={data.pageCount} handlePageClick={handlePageClick} />
                </div>
            </div>
        </>
    );
};
export default Paginate