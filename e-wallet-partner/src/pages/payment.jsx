import Header from '../components/header/header_dashboard'
import ItemTransaction from '../components/dashboard/item_transaction'
import partnerAPI from '../api/partner.api'
import { useEffect, useState } from "react"
import ReactPaginate from 'react-paginate';
import SideBar from '../components/dashboard/sidebar';
export default function Payment({ itemsPerPage }) {
    const [isLoading, setIsLoading] = useState(true);
    const [transactionData, setTransactionData] = useState([]);
    const [pageCount,setPageCount] = useState(null)
    const [page,setPage] = useState(1)
    const [pageSize,setPageSize] = useState(10)
    useEffect(() => {
        document.title = 'History Payment';
        const fetchData = async () => {
            const response = await partnerAPI.getTransactions(page, pageSize);
            if (response?.status === 200) {
                setTransactionData(response.data.data.transaction || []);
                setPageCount(response.data.data.page_count);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);
    const handlePageClick =async (event) => {
        console.log(event)
        setPage(event.selected+1)
        setIsLoading(true)
        const response = await partnerAPI.getTransactions(page, pageSize);
        if (response?.status === 200) {
            setTransactionData(response.data.data.transaction || []);
            setPageCount(response.data.data.page_count);
            setIsLoading(false);
        }
    };
    return (
        <div className='flex'>
            <SideBar state="Transaction History"></SideBar>
            <div className='w-full p-4'>
            <div className='space-y-2 my-4'>
                    <h1 className='font-semi-4xl'>Transaction History</h1>
                    <h1 className=''>Access & manage your account and transactions efficiently.</h1>
                </div>
            <table className='min-w-full bg-white rounded-lg font-semibold shadow-md overflow-hidden'>
                <thead>
                    <tr className=' text-gray-700  border-b-[1px] bg-gray-50 '>
                        <td className='p-4'>Amount</td>
                        <td className='p-4'>Status</td>
                        <td className='p-4'>Descriptions</td>
                        <td className='p-4'>Order ID</td>
                        <td className='p-4'>Date</td>
                        <td className='p-4'>Type</td>
                    </tr>
                    </thead>
                    <tbody>
                    {isLoading ? '...Loading' : transactionData.map((item,key)=>(
                        <ItemTransaction item={item} key={key}/>
                    ))}
                    </tbody>
                </table>
            <div className=' w-fit mx-auto'>
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

            </div>
            </div>
                    
        </div>
    )
}
