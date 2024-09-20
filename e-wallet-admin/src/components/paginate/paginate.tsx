import React, { useEffect, useState } from "react";
import TransactionHistory from "../transaction/TransactionHistory";
import ReactPaginate from 'react-paginate';
import { IoChevronBackOutline } from "react-icons/io5";
import { IoChevronForwardOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import transactionInstance from "../API/transactionInstance.api";
interface PaginateProps {
    userID?:string
    type?:String
}

interface ITransactionHistory {
    _id: string;
    title?: string;
    message?: string;
    amount: number;
    status: string;
    type: string;

    currency?: {
      _id: string;
      symbol: string;
      name: string;
    };
    receiver?: {
      _id:string;
      email:string;
    }
    sender?: {
      _id:string;
      email: string;
      full_name:string;
      avatar:string;
    }
    createdAt?: string;
    updatedAt?: string
    }
//Paginate
const Paginate: React.FC<PaginateProps> = ({ userID,type }) => {
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const handlePageClick = (e: { selected: number }) => {
        setCurrentPage(e.selected+1)
    };
    const { data = [], isLoading, isError } = useQuery({
        queryKey: ['transactions', currentPage+'_'+userID+'_'+type],
        queryFn: async () => {
            const response = await transactionInstance.get(`/get-transactions?id=${userID}&page=${currentPage}&type=${type}&page_limit=20&sort=asc`);
            console.log('API response:',response.data); 
            console.log('Page count:', response.data.pageCount);
            setPageCount(response.data.pageCount || 0);
            return response.data.data || [];
        },
    });


    if(isLoading){
        return <div>Loading</div>
    } 
    if(isError){
        return <div>Error</div>
    }
    console.log(data)
    return (    
        <>   
            <div>
                <div className=" overflow-x-auto">
                    <table className="w-full border-collapse rounded-2xl overflow-hidden ">
                        <thead className="bg-[#F1F4F9] text-[#000000] text-base sticky top-0">
                            <tr>
                                <th className="text-left pl-4 pt-[10px] pb-[10px] h-[50px]">MESSENGER</th>
                                <th className="text-left pl-4 pt-[10px] pb-[10px] h-[50px]">AMOUNT</th>
                                <th className="text-left pl-4 pt-[10px] pb-[10px] h-[50px]">STATUS</th>
                                <th className="text-left pl-4 pt-[10px] pb-[10px] h-[50px]">DATE</th>
                                <th className="text-left pl-4 pt-[10px] pb-[10px] h-[50px]">TYPE</th>
                            </tr>
                        </thead>
                        <tbody className=" overflow-y-auto">
                            {isLoading ? <h1>isLoading</h1> : data?.map((item:ITransactionHistory, index:number ) => (
                                <tr key={index} className="border-t-2 h-[70px] hover:bg-gray-200">
                                    <TransactionHistory {...item}/>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

                 <ReactPaginate
                    nextLabel="next"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="previous"
                    pageClassName="inline-block mx-1"
                    pageLinkClassName="py-2 px-4 border rounded-lg text-blue-600 hover:bg-gray-200"
                    previousClassName="inline-block mx-1"
                    previousLinkClassName="py-2 px-4 border rounded-lg text-blue-600 hover:bg-gray-200"
                    nextClassName="inline-block mx-1"
                    nextLinkClassName="py-2 px-4 border rounded-lg text-blue-600 hover:bg-gray-200"
                    breakLabel="..."
                    breakClassName="inline-block mx-1"
                    breakLinkClassName="py-2 px-4 border rounded-lg text-blue-600 hover:bg-gray-200"
                    containerClassName="flex justify-center py-4"
                    activeClassName="font-bold text-white "
                    
                />
        </>
    );
};
export default Paginate