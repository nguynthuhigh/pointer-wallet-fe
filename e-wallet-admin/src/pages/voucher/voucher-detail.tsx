import SideBar from "@/components/sidebar/sidebar"
import AvatarDefault from '../../assets/png/avatarDefault.png'
import { GoDotFill } from "react-icons/go";

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { SiTicktick } from "react-icons/si";
import { GiCancel } from "react-icons/gi";
import { CardPartner } from "@/components/card/partner";
import { CardVoucher } from "@/components/card/voucher";
import { DateFrom } from "@/components/date/date-from";
import { DateTo } from "@/components/date/date-to";
import { Button } from "@mui/material";
import { useState } from "react";
import { SortBox } from "@/components/box/box-sort";
import { IVoucher } from "@/interfaces/voucher"
import { HeaderComponent } from "@/components/header/header";
import { motion } from 'framer-motion'
import { useQuery } from "@tanstack/react-query";
import { FaAws } from "react-icons/fa";
import axiosInstance from "@/api/axiosInstance";
import { useParams } from "react-router-dom";
export const VoucherDetail = () => {
    const {id} = useParams()
    const {data:voucherDetail,isLoading,isError} = useQuery({
        queryKey: ['get-voucher-detail'],
        queryFn: async () => {
            const response = await axiosInstance.get(`/api/v1/admin/voucher-details/${id}`)
            return response.data
        }
    })
    if(isLoading) return 'Loading...'
    if(isError) return 'Fetching Data Error'
    console.log(voucherDetail)

    // const [selectedFromDate, setSelectedFromDate] = useState<Date | null>(null);
    // const [selectedToDate, setSelectedToDate] = useState<Date | null>(null);
    // const clearFilters = () => {
    //     setSelectedFromDate(null);
    //     setSelectedToDate(null);
    // }
    // const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    // //Handle
    // const handleSortOrder = () => {
    //     setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    // }
    return (
        <>
            <div className="flex-1 overflow-auto h-screen">
                <HeaderComponent title="Voucher Detail" />
                <main className="max-w-7xl mx-auto px-4 py-6">
                    <motion.div className="bg-gray-800 bg-opacity-70 border border-gray-700 backdrop-blur-md p-4">
                        <div className="flex gap-x-[20px]">
                            <CardVoucher
                                title={voucherDetail.data.title}
                                content={voucherDetail.data.content}
                                quantity={voucherDetail.data.quantity}
                                usedcount={voucherDetail.data.usedCount}
                                code={voucherDetail.data.code}
                            />
                            <CardPartner
                                id='123'
                                profileName='Profile Partner'
                                img={AvatarDefault}
                                name={voucherDetail.data.partnerID.name}
                                email= 'null'
                                date='null'
                            />
                        </div>

                        {/* <div className="overflow-x-auto">
                            <div className="flex justify-between mt-[20px]">
                                <div id="Title" className="text-3xl font-semibold">Vouchers Transactions </div>
                                <div className="flex flex-row gap-x-[10px] ">
                                    <div id="FromDate" className="relative z-30">
                                        <DateFrom selectedFromDate={selectedFromDate} setSelectedFromDate={setSelectedFromDate} />
                                    </div>
                                    <div id="ToDate" className='relative z-30'>
                                        <DateTo selectedToDate={selectedToDate} setSelectedToDate={setSelectedToDate} />
                                    </div>
                                    <div id="BtnDeleteFilter">
                                        <Button variant='contained' onClick={clearFilters} sx={{ height: '36' }}>Delete</Button>
                                    </div>
                                    <div id="SearchSort" className="flex gap-x-[10px] h-[36px] mr-[10px]">
                                        <SortBox sortOrder={sortOrder} handleSortOrder={(handleSortOrder)} />
                                    </div>
                                </div>
                            </div>
                            <div id="Table">
                                <Table>
                                    <TableHeader className="uppercase" >
                                        <TableRow>
                                            <TableHead className="text-[#1A3E5F] font-bold">No.</TableHead>
                                            <TableHead className="text-[#1A3E5F] font-bold">Photo</TableHead>
                                            <TableHead className="text-[#1A3E5F] font-bold ">Code</TableHead>
                                            <TableHead className="text-[#1A3E5F] font-bold">Quantity</TableHead>
                                            <TableHead className="text-[#1A3E5F] font-bold">UsedCount</TableHead>
                                            <TableHead className="text-[#1A3E5F] font-bold">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {voucherDetail.map((vouchers: IVoucher, index: number) => (
                                            <TableRow key={index}>
                                                <td className="pl-3">{getNumber(index)}</td>
                                                <TableCell>{vouchers.image
                                                    ? <img src={AvatarDefault} className="rounded-full size-[40px] object-cover" />
                                                    : <img src={AvatarDefault} className="rounded-full size-[40px] object-cover" />}
                                                </TableCell>
                                                <TableCell>{vouchers.code}</TableCell>
                                                <TableCell>{vouchers.quantity}</TableCell>
                                                <TableCell>{vouchers.usedCount}</TableCell>
                                                <TableCell className={`w-fit ${vouchers.statusPublic ? 'text-[#027A48] bg-[#ECFDF3]' : 'bg-[#FFE3E3] text-[#FF1717]'} h-[30px] mt-4 px-[8px] rounded-[16px] flex items-center`}
                                                >   <GoDotFill className="ml-[6px] mr-[4px]" />
                                                    <div className="mr-[8px] font-bold">
                                                        {vouchers.statusPublic ? 'Active' : 'Inactive'}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <PaginateComponents pageCount={data.pageCount} handlePageClick={handlePageClick}/>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </div>
                        </div> */}
                    </motion.div>
                </main>
            </div>
        </>
    )
}