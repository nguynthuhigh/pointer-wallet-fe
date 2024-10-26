import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { IVoucher } from "@/interfaces/voucher";
import PaginateComponents from "../paginate-component/paginate-component";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
export const PaginateVoucher = () => {
    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState<number>(1);

    const itemsPerPage = 10
    const {data:voucher,isLoading,isError} = useQuery({
        queryKey: ['voucher-list'],
        queryFn: async () => {
            const response = await axiosInstance.get('/api/v1/admin/get-vouchers',{
                params: {
                    page: currentPage,
                    page_limit: itemsPerPage
                }
            })
            return response.data.data
        }
    })
    console.log(voucher)
    if (isLoading) return 'Loading...'
    if (isError) return 'Error Fetching Data'

    const getID = (index:number) => {
        const customID = (currentPage - 1 ) * itemsPerPage + index + 1
        return customID.toString().padStart(2,'0')
    }
    const handleClick = (voucher: IVoucher) => {
        navigate(`/voucher-list/detail/${voucher._id}`)
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
                            <TableHead className="text-[#1A3E5F] font-bold">Photo</TableHead>
                            <TableHead className="text-[#1A3E5F] font-bold ">Code</TableHead>
                            <TableHead className="text-[#1A3E5F] font-bold">Quantity</TableHead>
                            <TableHead className="text-[#1A3E5F] font-bold">UsedCount</TableHead>
                            <TableHead className="text-[#1A3E5F] font-bold">Status</TableHead>
                            <TableHead className="text-[#1A3E5F] font-bold">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {voucher.vouchers.map((voucher: IVoucher, index: number) => (
                            <TableRow key={index}>
                                <td className="pl-3">{getID(index)}</td>
                                <td><img src ={voucher.image} className="size-[50px] rounded-full object-contain"/></td>
                                <td>{voucher.code}</td>
                                <td>{voucher.quantity}</td>
                                <td>{voucher.usedCount}</td>
                                <td>{voucher.statusPublic}</td>
                                <td key={voucher._id} onClick = {() => handleClick(voucher)} className="pl-3 text-[#0094FF] font-bold hover:transition-all hover:-translate-y-2 duration-300 cursor-pointer">View Detail</td>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div id='Paginate'>
                <PaginateComponents pageCount={voucher.pageCount} handlePageClick={handleClickPage} />
            </div> 
        </>
    )
}