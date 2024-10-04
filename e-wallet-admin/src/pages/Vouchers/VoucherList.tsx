import { DateFrom } from "@/components/Date/DateFrom/dateFrom"
import SideBar from "../../components/sidebar/sidebar"
import { FilterBox } from "@/components/Box/FilterBox/filterBox"
import { DateTo } from "@/components/Date/DateTo/dateTo"
import { useState } from "react"
import { SearchBox } from "@/components/Box/SearchBox/searchBox"
import { SortBox } from "@/components/Box/SortBox/sortBox"
import AvatarDefault from '../../assets/png/Avatar.png'
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
import { IVoucher } from "@/interface/Voucher"
import { useNavigate } from "react-router-dom"

type voucherPick = Pick<IVoucher, 'image' | 'code' | 'quantity' | 'usedCount' | 'statusPublic'>

export const VoucherList = () => {
    const data: IVoucher[] = [
        {
            _id: "66e9a34f4ae3e8423635dc51",
            title: "Thanh toán hóa đơn với Pointer Wallet giảm ngay 100%",
            image: "http://res.cloudinary.com/ds0cz9t6b/image/upload/v1726587726/gtb7fljgj9q7p9lzlnt4.jpg",
            content: "Nhập mã POINTER giảm ngay 100%",
            code: "POINTER",
            quantity: 100,
            usedCount: 0,
            statusPublic: false,
            discountValue: 100,
            type: "discount_percent",
            min_condition: 0,
            partnerID: "668fd96caa7b610a6e708a17",
            currency: "667ee9da8868e89c7832a35e",
            isPublic: false,
            createdAt: "2024-09-17T15:42:07.137Z",
            updatedAt: "2024-09-17T15:42:07.137Z",
        },
        {
            _id: "66e9a34f4ae3e8423635dc51",
            title: "Thanh toán hóa đơn với Pointer Wallet giảm ngay 100%",
            image: "http://res.cloudinary.com/ds0cz9t6b/image/upload/v1726587726/gtb7fljgj9q7p9lzlnt4.jpg",
            content: "Nhập mã POINTER giảm ngay 100%",
            code: "POINTER",
            quantity: 100,
            usedCount: 0,
            statusPublic: false,
            discountValue: 100,
            type: "discount_percent",
            min_condition: 0,
            partnerID: "668fd96caa7b610a6e708a17",
            currency: "667ee9da8868e89c7832a35e",
            isPublic: false,
            createdAt: "2024-09-17T15:42:07.137Z",
            updatedAt: "2024-09-17T15:42:07.137Z",
        },
        {
            _id: "66e9a34f4ae3e8423635dc51",
            title: "Thanh toán hóa đơn với Pointer Wallet giảm ngay 100%",
            image: "http://res.cloudinary.com/ds0cz9t6b/image/upload/v1726587726/gtb7fljgj9q7p9lzlnt4.jpg",
            content: "Nhập mã POINTER giảm ngay 100%",
            code: "POINTER",
            quantity: 100,
            usedCount: 0,
            statusPublic: false,
            discountValue: 100,
            type: "discount_percent",
            min_condition: 0,
            partnerID: "668fd96caa7b610a6e708a17",
            currency: "667ee9da8868e89c7832a35e",
            isPublic: false,
            createdAt: "2024-09-17T15:42:07.137Z",
            updatedAt: "2024-09-17T15:42:07.137Z",
        }
        , {
            _id: "66e9a34f4ae3e8423635dc51",
            title: "Thanh toán hóa đơn với Pointer Wallet giảm ngay 100%",
            image: "http://res.cloudinary.com/ds0cz9t6b/image/upload/v1726587726/gtb7fljgj9q7p9lzlnt4.jpg",
            content: "Nhập mã POINTER giảm ngay 100%",
            code: "POINTER",
            quantity: 100,
            usedCount: 0,
            statusPublic: false,
            discountValue: 100,
            type: "discount_percent",
            min_condition: 0,
            partnerID: "668fd96caa7b610a6e708a17",
            currency: "667ee9da8868e89c7832a35e",
            isPublic: false,
            createdAt: "2024-09-17T15:42:07.137Z",
            updatedAt: "2024-09-17T15:42:07.137Z",
        },
        {
            _id: "66e9a34f4ae3e8423635dc51",
            title: "Thanh toán hóa đơn với Pointer Wallet giảm ngay 100%",
            image: "http://res.cloudinary.com/ds0cz9t6b/image/upload/v1726587726/gtb7fljgj9q7p9lzlnt4.jpg",
            content: "Nhập mã POINTER giảm ngay 100%",
            code: "POINTER",
            quantity: 100,
            usedCount: 0,
            statusPublic: false,
            discountValue: 100,
            type: "discount_percent",
            min_condition: 0,
            partnerID: "668fd96caa7b610a6e708a17",
            currency: "667ee9da8868e89c7832a35e",
            isPublic: false,
            createdAt: "2024-09-17T15:42:07.137Z",
            updatedAt: "2024-09-17T15:42:07.137Z",
        },
        {
            _id: "66e9a34f4ae3e8423635dc51",
            title: "Thanh toán hóa đơn với Pointer Wallet giảm ngay 100%",
            image: "http://res.cloudinary.com/ds0cz9t6b/image/upload/v1726587726/gtb7fljgj9q7p9lzlnt4.jpg",
            content: "Nhập mã POINTER giảm ngay 100%",
            code: "POINTER",
            quantity: 100,
            usedCount: 0,
            statusPublic: false,
            discountValue: 100,
            type: "discount_percent",
            min_condition: 0,
            partnerID: "668fd96caa7b610a6e708a17",
            currency: "667ee9da8868e89c7832a35e",
            isPublic: false,
            createdAt: "2024-09-17T15:42:07.137Z",
            updatedAt: "2024-09-17T15:42:07.137Z",
        },
        {
            _id: "66e9a34f4ae3e8423635dc51",
            title: "Thanh toán hóa đơn với Pointer Wallet giảm ngay 100%",
            image: "http://res.cloudinary.com/ds0cz9t6b/image/upload/v1726587726/gtb7fljgj9q7p9lzlnt4.jpg",
            content: "Nhập mã POINTER giảm ngay 100%",
            code: "POINTER",
            quantity: 100,
            usedCount: 0,
            statusPublic: false,
            discountValue: 100,
            type: "discount_percent",
            min_condition: 0,
            partnerID: "668fd96caa7b610a6e708a17",
            currency: "667ee9da8868e89c7832a35e",
            isPublic: false,
            createdAt: "2024-09-17T15:42:07.137Z",
            updatedAt: "2024-09-17T15:42:07.137Z",
        },
        {
            _id: "66e9a34f4ae3e8423635dc51",
            title: "Thanh toán hóa đơn với Pointer Wallet giảm ngay 100%",
            image: "http://res.cloudinary.com/ds0cz9t6b/image/upload/v1726587726/gtb7fljgj9q7p9lzlnt4.jpg",
            content: "Nhập mã POINTER giảm ngay 100%",
            code: "POINTER",
            quantity: 100,
            usedCount: 0,
            statusPublic: false,
            discountValue: 100,
            type: "discount_percent",
            min_condition: 0,
            partnerID: "668fd96caa7b610a6e708a17",
            currency: "667ee9da8868e89c7832a35e",
            isPublic: false,
            createdAt: "2024-09-17T15:42:07.137Z",
            updatedAt: "2024-09-17T15:42:07.137Z",
        },
    ]
    // const [currentPage,setCurrentPage] = useState<number>(1)
    // const getNumber = (index:number) => { 
    //     return (currentPage - 1) * itemsPerPage + index + 1
    // }
    const navigate = useNavigate();
    const handleClick = (voucher: IVoucher) => {
        const { _id } = voucher
        navigate(`/listVoucher/detailVoucher/${_id}`, { state: { _id } })
    }
    return (
        <>
            <div className="flex">
                <SideBar state={"Vouchers"} />
                <div className="w-full ml-[230px]">
                    <div id="Title">
                        <div className="text-[30px] font-bold mt-[10px]">Vouchers Management</div>
                        <div className="text-[17px] text-[#0094FF]">Unique identify for each vouchers </div>
                    </div>
                    <div id="Box">
                        <div>
                            {/* <FilterBox filter={} handleFilterChange={}/>
                        <DateFrom selectedFromDate={} setSelectedFromDate={}/>
                        <DateTo selectedToDate={} setSelectedToDate={}/> */}
                        </div>
                        <div>
                            {/* <SearchBox search={} handleSearch={}/>
                        <SortBox sortOrder={} handleSortOrder={}/> */}
                        </div>
                    </div>
                    <div id="Table">
                        <Table>
                            <TableHeader className="uppercase" >
                                <TableRow>
                                    {/* <TableHead className="text-[#1A3E5F] font-bold">No.</TableHead> */}
                                    <TableHead className="text-[#1A3E5F] font-bold">Photo</TableHead>
                                    <TableHead className="text-[#1A3E5F] font-bold ">Code</TableHead>
                                    <TableHead className="text-[#1A3E5F] font-bold">Quantity</TableHead>
                                    <TableHead className="text-[#1A3E5F] font-bold">UsedCount</TableHead>
                                    <TableHead className="text-[#1A3E5F] font-bold">Status</TableHead>
                                    <TableHead className="text-[#1A3E5F] font-bold">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.map((vouchers: IVoucher, index: number) => (
                                    <TableRow key={index}>
                                        {/* <td className="pl-3">{getNumber(index)}</td> */}
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
                                        <TableCell key={vouchers._id} onClick={() => handleClick(vouchers)} className="text-[#0094FF] font-bold hover:transition-all hover:-translate-y-2 duration-300 cursor-pointer">View Detail</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    {/* <PaginateComponents pageCount={data.pageCount} handlePageClick={handlePageClick}/> */}
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    )
}
