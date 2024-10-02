import SideBar from "@/components/sidebar/sidebar"
import { IVoucher } from "@/interface/Voucher"
import AvatarDefault from '../assets/png/Avatar.png'
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
export const VoucherDetail = () => {
    const data:IVoucher[]= [
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
        ,{
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
        ,{
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
        ,{
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

        ,{
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
        ,{
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
        ,{
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
        ,{
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
    ]
    return (
        <>
            <div className="flex">
                <SideBar state ={'Vouchers'}/>
                <div className="w-full ml-[230px]">
                    <div id="Title" className="mt-[10px] font-bold text-[30px]">Detail Voucher</div>
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
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {data.map((vouchers:IVoucher,index:number) => (
                            <TableRow key={index}>
                                {/* <td className="pl-3">{getNumber(index)}</td> */}
                                <TableCell>{vouchers.image 
                                ? <img src ={AvatarDefault} className="rounded-full size-[40px] object-cover"/> 
                                : <img src ={AvatarDefault} className="rounded-full size-[40px] object-cover"/> }
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