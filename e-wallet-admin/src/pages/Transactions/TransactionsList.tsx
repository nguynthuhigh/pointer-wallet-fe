import SideBar from "@/components/sidebar/sidebar"
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
import AvatarDefault from '../../assets/png/Avatar.png'
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export const TransactionsList = () => {
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

  const navigate = useNavigate()
  const handleClick = (transactions:IVoucher) => {
    // const {_id} = transactions
    // navigate(`/listTransaction/detailTransaction/${_id}`)
  }
  // const [showDropDown,setShowDropDown] = useState(false);
  return (
    <>
      <div className="flex">
        <div id="SideBar">
          <SideBar state={'Transactions'} />
        </div>
        <div className="flex-1 flex flex-col mr-[20px] ml-[230px] h-screen">
          <div id="Title" className="text-[36px] font-bold ">Transactions Management</div>
          <div id="TitleDetail" className="text-[17px] flex text-[#0094FF] pb-[10px]">All transactions become quick, efficient, seamless!</div>
          <div className="flex items-center justify-between pb-[10px]">
            <div className="flex text-base py-[10px] gap-x-[20px] cursor-pointer">
              <div id='FilterBox' className="relative flex justify-center">
                {/* <FilterBox filter={filter} handleFilterChange={handleFilterChange}/>    */}
              </div>
              <div className="relative z-20">
                <div id="FromDate">
                  {/* <DateFrom selectedFromDate={selectedFromDate} setSelectedFromDate={setSelectedFromDate}/> */}
                </div>
              </div>
              <div className='relative z-20'>
                <div id="ToDate" className=" relative">
                  {/* <DateTo selectedToDate={selectedToDate} setSelectedToDate={setSelectedToDate}/> */}
                </div>
              </div>
              {/* <Button variant='contained' onClick={clearFilters} sx={{height: '36', marginRight: '10px'}}>Delete</Button> */}
            </div>
            <div id="SearchSort" className="flex gap-x-[10px] h-[36px]">
              {/* <SearchBox search={search} handleSearch={handleSearch} />
                        <SortBox sortOrder={sortOrder} handleSortOrder={(handleSortOrder)}/> */}
            </div>
          </div>
          <div>
            {/* <PaginateUser
                    inactive = {filter}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    selectedFromDate={selectedFromDate}
                    selectedToDate={selectedToDate}
                    search={search}
                    sortOrder={sortOrder}
                    /> */}
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
                {data.map((transactions: IVoucher, index: number) => (
                  <>
                  <TableRow key={index} className=" relative">
                    {/* <td className="pl-3">{getNumber(index)}</td> */}
                    <TableCell>{transactions.image
                      ? <img src={AvatarDefault} className="rounded-full size-[40px] object-cover" />
                      : <img src={AvatarDefault} className="rounded-full size-[40px] object-cover" />}
                    </TableCell>
                    <TableCell>{transactions.code}</TableCell>
                    <TableCell>{transactions.quantity}</TableCell>
                    <TableCell>{transactions.usedCount}</TableCell>
                    <TableCell className={`w-fit ${transactions.statusPublic ? 'text-[#027A48] bg-[#ECFDF3]' : 'bg-[#FFE3E3] text-[#FF1717]'} h-[30px] mt-4 px-[8px] rounded-[16px] flex items-center`}
                    >   <GoDotFill className="ml-[6px] mr-[4px]" />
                      <div className="mr-[8px] font-bold">
                        {transactions.statusPublic ? 'Active' : 'Inactive'}
                      </div>
                    </TableCell>
                    <TableCell key={transactions._id} onClick={() => handleClick(transactions)} className="text-[#0094FF] font-bold hover:transition-all hover:-translate-y-2 duration-300 cursor-pointer">View Detail
                    </TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell>Sender: Nguyen</TableCell>
                    <TableCell>Receiver: Sang</TableCell>
                    <TableCell>Partner: PressPay</TableCell>
              </TableRow>
              </>
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

