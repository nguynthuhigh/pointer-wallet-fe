import axiosInstance from "../../../api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import AvatarDefault from '../../../assets/png/avatarDefault.png'
import { formatDate } from "../../transaction/transaction-history";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import PaginateComponents from "../paginate-component/paginate-component";
import { IUser } from "@/interfaces/customer";


export interface PaginateProps extends IUser {
    currentPage: number,
    setCurrentPage: (page: number) => void
    selectedFromDate: Date | null
    selectedToDate: Date | null
    search: string;
    sortOrder: 'asc' | 'desc';
}
type PickPaginate = Pick<PaginateProps, 'currentPage' | 'setCurrentPage' | 'search' | 'inactive' | 'sortOrder' | 'selectedFromDate' | 'selectedToDate'>

const itemsPerPage = 10;
export const PaginateUser = ({ currentPage, setCurrentPage, search, inactive, sortOrder, selectedFromDate, selectedToDate }: PickPaginate) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['users', currentPage, inactive, sortOrder, selectedFromDate, selectedToDate, search],
        queryFn: async () => {
            const response = await axiosInstance.get(`/api/v1/user/get-users`, {
                params: {
                    page: currentPage,
                    page_limit: itemsPerPage,
                    inactive: inactive,
                    search,
                    sort: sortOrder,
                    start: selectedFromDate?.toISOString(),
                    end: selectedToDate?.toISOString(),
                }
            }
            )
            return response.data.data
        },


    });

    console.log(data)
    const navigate = useNavigate();
    const handleUserClick = (id:string) => {
        navigate(`/customer-list/detail/${id}`);
    };

    const handleClickPage = (e: { selected: number }) => {
        setCurrentPage(e.selected + 1);
    };

    if (isLoading) return 'Loading...'
    if (isError) return 'Error Fetching Data'

    const getID = (index: number) => {
        const customID = (currentPage - 1) * itemsPerPage + index + 1;
        return `${customID.toString().padStart(2, '0')}`
    }
    const getNameID = (user: IUser) => {
        if (user.full_name)
            return user.full_name
        return `U${user._id.slice(-4)}`
    }

    return (
        <>
            <div>
                <Table>
                    <TableHeader className="uppercase" >
                        <TableRow>
                            <TableHead className="text-gray-100 font-bold">No</TableHead>
                            <TableHead className="text-gray-100 font-bold">Photo</TableHead>
                            <TableHead className="text-gray-100 font-bold ">Name</TableHead>
                            <TableHead className="text-gray-100 font-bold">Email</TableHead>
                            <TableHead className="text-gray-100 font-bold">Join Date</TableHead>
                            <TableHead className="text-gray-100 font-bold">Status</TableHead>
                            <TableHead className="text-gray-100 font-bold">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.data.map((users: IUser, index: number) => (
                            <TableRow key={index} >
                                <TableCell className="font-bold">{getID(index)}</TableCell>
                                <TableCell className="font-medium">{users.avatar
                                    ? <img src={users.avatar} className="rounded-full h-[40px] w-[40px] object-cover" />
                                    : <img src={AvatarDefault} className="rounded-full h-[40px] w-[40px] object-cover" />}</TableCell>
                                <TableCell>{getNameID(users)}</TableCell>
                                <TableCell>{users.email}</TableCell>
                                <TableCell> {formatDate(users.createdAt)}</TableCell>
                                <TableCell className={`w-fit ${!users.inactive ? 'text-[#027A48] bg-[#ECFDF3]' : 'bg-[#FFE3E3] text-[#FF1717]'} h-[30px] mt-4 px-[8px] rounded-[16px] flex items-center`}
                                >   <GoDotFill className="ml-[6px] mr-[4px]" />
                                    <div className="mr-[8px] font-bold">
                                        {!users.inactive ? 'Active' : 'Inactive'}
                                    </div>
                                </TableCell>
                                <TableCell key={users._id} onClick={() => handleUserClick(users._id)} className="text-[#0094FF] font-bold hover:transition-all hover:-translate-y-2 duration-300 cursor-pointer">View Profile</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div id='Paginate'>
                <PaginateComponents pageCount={data.pageCount} handlePageClick={handleClickPage} />
            </div>
        </>
    );
};

