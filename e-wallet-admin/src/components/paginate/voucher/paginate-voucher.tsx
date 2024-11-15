import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { IVoucher } from "@/interfaces/voucher";
import PaginateComponents from "../paginate-component/paginate-component";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import { GoDotFill } from "react-icons/go";

interface PaginateVoucherProps {
    sortOrder: 'asc' | 'desc'
}



export const PaginateVoucher = ({sortOrder}:PaginateVoucherProps) => {
    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState<number>(1);

    const itemsPerPage = 10
    const { data: voucher, isLoading, isError } = useQuery({
        queryKey: ['voucher-list',sortOrder],
        queryFn: async () => {
            const response = await axiosInstance.get('/api/v1/admin/get-vouchers', {
                params: {
                    page: currentPage,
                    page_limit: itemsPerPage,
                    sort:sortOrder
                }
            })
            return response.data.data
        }
    })
    console.log(voucher)
    if (isLoading) return 'Loading...'
    if (isError) return 'Error Fetching Data'

    const getID = (index: number) => {
        const customID = (currentPage - 1) * itemsPerPage + index + 1
        return customID.toString().padStart(2, '0')
    }
    const handleClick = (voucher: IVoucher) => {
        navigate(`/voucher-list/detail/${voucher._id}`)
    }
    const handleClickPage = (e: { selected: number }) => {
        setCurrentPage(e.selected + 1)
    }
    return (
        <>
            <div>
                <Table>
                    <TableHeader className="uppercase" >
                        <TableRow>
                            <TableHead className="text-gray-100 font-bold">No.</TableHead>
                            <TableHead className="text-gray-100 font-bold">Photo</TableHead>
                            <TableHead className="text-gray-100 font-bold ">Code</TableHead>
                            <TableHead className="text-gray-100 font-bold">Quantity</TableHead>
                            <TableHead className="text-gray-100 font-bold">UsedCount</TableHead>
                            <TableHead className="text-gray-100 font-bold">Status</TableHead>
                            <TableHead className="text-gray-100 font-bold">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {voucher.vouchers.map((voucher: IVoucher, index: number) => (
                            <TableRow key={index} className="h-[65px]">
                                <td className="pl-3">{getID(index)}</td>
                                <td className="pl-3"><img src={voucher.image} className="size-[40px] rounded-full object-contain" /></td>
                                <td className="pl-3">{voucher.code}</td>
                                <td className="pl-3">{voucher.quantity}</td>
                                <td className="pl-3">{voucher.usedCount}</td>
                                <td
                                    className={`w-fit ${!voucher.statusPublic ? 'text-[#027A48] bg-[#ECFDF3]' : 'bg-[#FFE3E3] text-[#FF1717]'} h-[30px] mt-4 px-[8px] rounded-[16px] flex items-center`}
                                ><GoDotFill className="ml-[6px] mr-[4px]" />
                                    <div className="mr-[8px] font-bold">
                                        {!voucher.statusPublic ? 'Active' : 'Inactive'}
                                    </div>
                                </td>
                                <td key={voucher._id} onClick={() => handleClick(voucher)} className="pl-3 text-[#0094FF] font-bold hover:transition-all hover:-translate-y-2 duration-300 cursor-pointer">View Detail</td>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div id='Paginate' className="border-t pt-4">
                <PaginateComponents pageCount={voucher.pageCount} handlePageClick={handleClickPage} />
            </div>
        </>
    )
}