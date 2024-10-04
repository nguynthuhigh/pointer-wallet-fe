import SideBar from "@/components/sidebar/sidebar"
import { SiTicktick } from "react-icons/si"
import AvatarDefault from '../../assets/png/Avatar.png'
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
import { GoDotFill } from "react-icons/go"
export const TransactionDetail = () => {
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
        <SideBar state={'Transactions'} />
        <div className="w-full ml-[230px] h-screen mt-[8px]">
          <div className=" px-4 py-4 border-[2px] rounded-[16px] flex justify-between shadow-[4px_4px_4px_rgba(0,0,0,0.10)]">
            <div id="ViewPartner">
              <div id="InforUser" className="flex items-center h-full">
                <div id="avatarUser" className=" shrink-0">
                  <img src={AvatarDefault} className="size-[60px] border rounded-full" />
                </div>
                <div className="flex flex-col h-full justify-between pl-5 ">
                  <div className="w-fit flex justify-between items-center">
                    <div id="nameUser" className="text-xl font-bold text-[#1E3A5F] uppercase flex-grow ">Em Sang</div>
                    <div className={`flex items-center gap-x-[5px] pl-2`}>
                      <div id="iconActiveUser"> <SiTicktick /> </div>
                      <div id="activeUser" className="text-md"> Active</div>
                    </div>
                  </div>
                  <div id="emailUser" className="w-fit text-lg flex items-center justify-center gap-x-[8px] text-[#0094FF]">sang0902@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto relative">
            <div id="stick" className="flex justify-between items-center mt-[20px]">
              <div id="Title" className="text-[20px] font-semibold">Transactions Detail </div>
            </div>
          </div>
          <div id="Table">
            <Table>
              <TableHeader className="uppercase" >
                <TableRow>
                  {/* <TableHead className="text-[#1A3E5F] font-bold">No.</TableHead> */}
                  <TableHead className="text-[#1A3E5F] font-bold">Photo</TableHead>
                  <TableHead className="text-[#1A3E5F] font-bold ">Receiver</TableHead>
                  <TableHead className="text-[#1A3E5F] font-bold">Partner</TableHead>
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

