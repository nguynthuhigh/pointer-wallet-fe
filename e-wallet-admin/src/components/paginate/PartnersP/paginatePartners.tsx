import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/components/API/axiosInstance";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoChevronForwardOutline } from "react-icons/io5";
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
import { formatDate } from "@/components/transaction/TransactionHistory";
import AvatarDefault from '../../../assets/png/Avatar.png'
import { useNavigate } from "react-router-dom";
interface IPartnersProps {
    _id: string,
    name: string
    image?: string | null
    email: string,
    inactive: 'all' | 'false' | 'true'
    createdAt: string,
    updatedAt?: string,
    description:string,
}

interface IPartnerData extends IPartnersProps{
    selectedFromDate: Date | null
    selectedToDate: Date | null
    sort: 'asc' | 'desc'
    search: string
    currentPage:number
    setCurrentPage: (page:number) => void

}
type PartnerPick = Pick<IPartnerData,'currentPage' | 'setCurrentPage' | 'inactive' | 'selectedFromDate' | 'selectedToDate' | 'sort' | 'search' >

export const PaginatePartners = ({selectedFromDate,selectedToDate,sort,search,inactive,currentPage,setCurrentPage}:PartnerPick) => {
    
    const navigate = useNavigate();
    const handleClickDetail = (partners: IPartnersProps,customID:string,getName:string) => {
        const {_id ='',name,email,image,inactive,createdAt} = partners
        navigate(`/listPartner/detailListPartner/${_id}`, {state : {customID,getName,name,email,image,inactive,createdAt}})
    }

    const itemsPerPage = 8;
    const {data,isLoading,isError} = useQuery({
        queryKey: ['Partners',currentPage],
        queryFn: async () => {
            const response = await axiosInstance.get(`/api/v1/partner-management/get-partners`,{
                params: {
                    page:currentPage,
                    page_limit: itemsPerPage,
                    inactive:inactive,
                    start:selectedFromDate?.toISOString(),
                    end:selectedToDate?.toISOString(),
                    sort:sort,
                    search
                }
            })
            return response.data.data;
        }
    })
    if (isLoading) return 'Loading...'
    if (isError) return 'Error Fetch Data'
    console.log(data)

    const handlePageClick = (e: {selected: number}) => {
        setCurrentPage(e.selected+1)
    }

    const getID = (index:number) => {
        const customID = (currentPage - 1) * itemsPerPage + index + 1
        return `${customID.toString().padStart(2,'0')}`
    }

    const getNameID = (partner:IPartnersProps) => {
        if (partner.name) return partner.name
        return `P${partner._id.slice(-4)}`
    }
    return (
        <>  
                <Table>
                    <TableHeader className="uppercase" >
                    <TableRow>
                        <TableHead className="text-[#1A3E5F] font-bold">No.</TableHead>
                        <TableHead className="text-[#1A3E5F] font-bold">Photo</TableHead>
                        <TableHead className="text-[#1A3E5F] font-bold ">Name</TableHead>
                        <TableHead className="text-[#1A3E5F] font-bold">Email</TableHead>
                        <TableHead className="text-[#1A3E5F] font-bold">Join Date</TableHead>
                        <TableHead className="text-[#1A3E5F] font-bold">Status</TableHead>
                        <TableHead className="text-[#1A3E5F] font-bold">Action</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {data.data.map((partners:IPartnersProps,index:number) => (
                        <TableRow key={index}>
                        <TableCell className="font-bold">{getID(index)}</TableCell>
                        <TableCell className="font-medium">{partners.image
                         ? <img src = {AvatarDefault} className="rounded-full h-[40px] w-[40px] object-cover"/>   
                         : <img src = {AvatarDefault} className="rounded-full h-[40px] w-[40px] object-cover"/>}</TableCell>
                        <TableCell>{getNameID(partners)}</TableCell>
                        <TableCell>{partners.email}</TableCell>
                        <TableCell> {formatDate(partners.createdAt)}</TableCell>
                        <TableCell className={`w-fit ${!partners.inactive ? 'text-[#027A48] bg-[#ECFDF3]' : 'bg-[#FFE3E3] text-[#FF1717]'} h-[30px] mt-4 px-[8px] rounded-[16px] flex items-center`}
                        >   <GoDotFill className="ml-[6px] mr-[4px]" />
                            <div className="mr-[8px] font-bold">
                                {!partners.inactive ? 'Active' : 'Inactive'}
                            </div>
                        </TableCell>
                        <TableCell key={partners._id} onClick={() => handleClickDetail(partners,getID(index),getNameID(partners))} className="text-[#0094FF] font-bold hover:transition-all hover:-translate-y-2 duration-300 cursor-pointer">View Profile</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableFooter>
                    <TableRow>
                            <ReactPaginate
                            className="w-[1280px] flex items-center justify-center gap-x-[10px] fixed"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={3}
                            pageCount={data.pageCount}
                            previousLabel={<IoChevronBackOutline className="size-[16px] text-[#0094FF]" />}
                            pageClassName="inline-block mx-1"
                            pageLinkClassName="py-2 px-4 border rounded-lg text-[#0094FF] hover:bg-gray-200"
                            previousClassName="inline-block"
                            previousLinkClassName="py-2 px-4 text-[#0094FF]"
                            nextLabel={<IoChevronForwardOutline className="size-[16px] text-[#0094FF]" />}
                            nextClassName="inline-block"
                            nextLinkClassName="py-2 px-4 text-[#0094FF]"
                            breakLabel="..."
                            breakClassName="inline-block mx-1"
                            breakLinkClassName="py-2 px-4 border rounded-lg text-[#0094FF] hover:bg-gray-200"
                            containerClassName="flex justify-center py-4"
                            activeClassName="font-bold text-white "
                            activeLinkClassName="font-bold "
                        />
                    </TableRow>
                    </TableFooter>
                </Table>    
        </>
    )
}
