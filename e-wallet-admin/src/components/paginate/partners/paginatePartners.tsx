import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/components/API/axiosInstance";
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
import PaginateComponents from "../paginateComponent/PaginateComponents";
interface IPartnersProps {
    _id: string,
    name: string
    image?: string | null
    email: string,
    inactive: 'all' | 'false' | 'true'
    createdAt: string,
    updatedAt?: string,
    description: string,
}

export interface IPartnerData extends IPartnersProps {
    selectedFromDate: Date | null
    selectedToDate: Date | null
    sort: 'asc' | 'desc'
    search: string
    currentPage: number
    setCurrentPage: (page: number) => void

}
type PartnerPick = Pick<IPartnerData, 'currentPage' | 'setCurrentPage' | 'inactive' | 'selectedFromDate' | 'selectedToDate' | 'sort' | 'search'>

export const PaginatePartners = ({ selectedFromDate, selectedToDate, sort, search, inactive, currentPage, setCurrentPage }: PartnerPick) => {

    const navigate = useNavigate();
    const handleClickDetail = (id:string) => {
        navigate(`/partner-list/detail/${id}`)
    }

    const itemsPerPage = 10;
    const { data, isLoading, isError } = useQuery({
        queryKey: ['Partners', currentPage, sort, inactive, selectedFromDate, selectedToDate],
        queryFn: async () => {
            const response = await axiosInstance.get(`/api/v1/partner-management/get-partners`, {
                params: {
                    page: currentPage,
                    page_limit: itemsPerPage,
                    active: inactive,
                    start: selectedFromDate?.toISOString(),
                    end: selectedToDate?.toISOString(),
                    sort: sort,
                    search:search

                    
                }
            })
            return response.data.data;
        }
    })
    if (isLoading) return 'Loading...'
    if (isError) return 'Error Fetch Data'
    console.log(data)

    const handlePageClick = (e: { selected: number }) => {
        setCurrentPage(e.selected + 1)
    }

    const getID = (index: number) => {
        const customID = (currentPage - 1) * itemsPerPage + index + 1
        return `${customID.toString().padStart(2, '0')}`
    }

    const getNameID = (partner: IPartnersProps) => {
        if (partner.name) return partner.name
        return `P${partner._id.slice(-4)}`
    }
    return (
        <>
            <div>
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
                        {data.data.map((partners: IPartnersProps, index: number) => (
                            <TableRow key={index}>
                                <TableCell className="font-bold">{getID(index)}</TableCell>
                                <TableCell className="font-medium">{partners.image
                                    ? <img src={AvatarDefault} className="rounded-full h-[40px] w-[40px] object-cover" />
                                    : <img src={AvatarDefault} className="rounded-full h-[40px] w-[40px] object-cover" />}</TableCell>
                                <TableCell>{getNameID(partners)}</TableCell>
                                <TableCell>{partners.email}</TableCell>
                                <TableCell> {formatDate(partners.createdAt)}</TableCell>
                                <TableCell className={`w-fit ${!partners.inactive ? 'text-[#027A48] bg-[#ECFDF3]' : 'bg-[#FFE3E3] text-[#FF1717]'} h-[30px] mt-4 px-[8px] rounded-[16px] flex items-center`}
                                >   <GoDotFill className="ml-[6px] mr-[4px]" />
                                    <div className="mr-[8px] font-bold">
                                        {!partners.inactive ? 'Active' : 'Inactive'}
                                    </div>
                                </TableCell>
                                <TableCell key={partners._id} onClick={() => handleClickDetail(partners._id)} className="text-[#0094FF] font-bold hover:transition-all hover:-translate-y-2 duration-300 cursor-pointer">View Profile</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div>
                <PaginateComponents pageCount={data.pageCount} handlePageClick={handlePageClick} />
            </div>
        </>
    )
}
