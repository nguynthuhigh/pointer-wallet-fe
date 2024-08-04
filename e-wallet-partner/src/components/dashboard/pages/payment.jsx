import Header from '../../header/header_dashboard'
import { ItemTransaction } from '../components/item_transaction'
import partnerAPI from '../../../api/partner.api'
import { useEffect, useState } from "react"
import ReactPaginate from 'react-paginate';

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
        <div>
            <Header />
            <div className='max-w-[1200px] mx-auto'>
                <div className="overflow-x-auto p-8 border-[1px] border-r-2 border-y-0 w-full">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="border rounded-lg divide-y divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
                            <div className="py-3 px-4">
                                <div className="relative max-w-xs">
                                    <label className="sr-only">Search</label>
                                    <input type="text" name="hs-table-with-pagination-search" id="hs-table-with-pagination-search" className="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Search for items" />
                                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                                        <svg className="size-4 text-gray-400 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <path d="m21 21-4.3-4.3"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className=" w-full">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                    <thead className="bg-gray-50 dark:bg-neutral-700">
                                        <tr>
                                            <th scope="col" className="py-3 px-4 pe-0">
                                                <div className="flex items-center h-5">
                                                    <input id="hs-table-pagination-checkbox-all" type="checkbox" className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                                                    <label htmlFor="hs-table-pagination-checkbox-all" className="sr-only">Checkbox</label>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Amount</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Description</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Transaction ID</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Order ID</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">DATE</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                        {isLoading ? '...loading' : transactionData.map((item) => (
                                            <ItemTransaction key={item.id} item={item} />
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
                    </div>
                </div>
            </div>
        </div>
    )
}
