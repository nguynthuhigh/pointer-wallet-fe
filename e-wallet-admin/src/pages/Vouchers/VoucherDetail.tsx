import SideBar from "@/components/sidebar/sidebar"
import { IVoucher } from "@/interface/Voucher"
import AvatarDefault from '../../assets/png/Avatar.png'
import { GoDotFill } from "react-icons/go";
import logoPressPay from '../../assets/png/logo_presspay.png'
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
export const VoucherDetail = () => {
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
        }
    ]
    return (
        <>
            <div className="flex">
                <SideBar state={'Vouchers'} />
                <div className="w-full ml-[230px] h-screen mt-[8px] ">
                    <div className="flex gap-x-[20px]">
                        <div className=" px-4 py-4 border-[1px] bg-white backdrop-filter backdrop-blur-lg rounded-[16px] flex justify-between shadow-[4px_4px_4px_rgba(0,0,0,0.10)]">
                            <div id="ViewVoucher">
                                <div className="flex items-center justify-between h-full">
                                    <div className="flex flex-col w-[350px] h-full justify-between gap-y-[10px]">
                                        <div className="flex justify-between items-center">
                                            <div id='Logo'><img src={logoPressPay} className="size-[40px]" /></div>
                                            <div id="Free" className="w-[65px] h-[30px] text-md flex justify-center items-center border-[1px] border-[#45A55B] rounded-[16px] bg-[#45A55B] text-white">Free</div>
                                        </div>
                                        <div>
                                            <div id="Title" className="text-sm font-semibold text-[#000000]">
                                                Thanh toán hóa đơn với Pointer Wallet
                                            </div>
                                            <div id="Content" className="text-lg font-bold text-[#0094FF]">
                                                Nhập mã POINTER giảm ngay 100%
                                            </div>
                                        </div>
                                        <div className="flex justify-between text-lg">
                                            <div id="Quantity" className="flex flex-col">
                                                <div id="Name" className=" text-sm text-[#758694]">Quantity</div>
                                                <div id="Value" className="font-semibold">100</div>
                                            </div>
                                            <div id="UsedCount" className="flex flex-col text-lg">
                                                <div id="Name" className="text-sm text-[#758694]">Usedcount</div>
                                                <div id="Value" className="font-semibold">0</div>
                                            </div>
                                            <div id="Code" className="flex flex-col">
                                                <div id="Name" className="text-sm text-[#758694]">Code</div>
                                                <div id="Value" className="uppercase font-semibold">Pointer</div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" border-[1px] rounded-[16px] flex justify-between shadow-[4px_4px_4px_rgba(0,0,0,0.10)]">
                            <div id="ViewPartner">
                                <div className="flex items-center justify-between h-full">
                                    <div className="flex w-[350px] h-full  gap-x-[10px]">
                                        <div id="AvatarPartner" className="flex justify-center border-r-[1px]  items-center w-[120px]">
                                             <div className="flex flex-col justify-center items-center gap-y-[20px]">
                                             <div className="text-[#0094FF] font-bold text-lg text-center">
                                                Profile Partner
                                             </div>
                                             <div>
                                                <img src={AvatarDefault} className="size-[70px] rounded-full" />
                                             </div>
                                             </div>
                                        </div>
                                        <div className="flex flex-col justify-center gap-y-[10px]">
                                            <div className="flex items-end gap-x-[5px]">
                                                <div id="Name">
                                                    <div id="Name" className="text-sm text-[#758694]">Name</div>
                                                    <div id="Value" className="font-semibold text-md">SanqSanq</div>
                                                </div>
                                                <div id="Status" className="flex items-center gap-x-[5px] text-[#45A55B]">
                                                    <div id="Name"><SiTicktick/></div>
                                                    <div id="Value">Active</div>
                                                </div>
                                            </div>
                                            <div id="Email">
                                                <div id="Name" className="text-sm text-[#758694]">Email</div>
                                                <div id="Value" className="font-semibold text-md">namsang0902s@gmail.com</div>
                                            </div>
                                            <div id="JoinDate">
                                                <div id="Name" className="text-sm text-[#758694]">Join</div>
                                                <div id="Value" className="font-semibold text-md">2024/01/01</div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="overflow-x-auto relative">
                        <div id="stick" className="flex justify-between items-center mt-[20px]">
                            <div id="Title" className="text-[20px] font-semibold">Vouchers Transactions </div>
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