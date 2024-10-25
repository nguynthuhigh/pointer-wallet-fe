// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useState } from "react";

// export const PaginateVoucher = () => {
//     const [currentPage, setCurrentPage] = useState<number>(1);

//     const itemsPerPage = 10
//     const {data:voucher,isLoading,isError} = useQuery({
//         queryKey: ['voucher-list'],
//         queryFn: async () => {
//             const response = await axios.get('/api/v1/admin/get-vouchers',{
//                 params: {
//                     page: currentPage,
//                     page_limit: itemsPerPage
//                 }
//             })
//             return response.data.data
//         }
//     })

//     return (
//         <>

//         </>
//     )
// }