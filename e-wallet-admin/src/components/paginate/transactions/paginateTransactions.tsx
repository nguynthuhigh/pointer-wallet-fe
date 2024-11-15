import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  //   TableCell,
  //   TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import PaginateComponents from "@/components/paginate/paginate-component/paginate-component";
import TransactionHistory from "@/components/transaction/transaction-history";
import { ITransaction } from "@/interfaces/transaction";
import axiosInstance from "@/api/axiosInstance";

interface ITransactionPage {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  filterType: "all" | "transfer" | "deposit" | "payment" | "withdraw";
  filterStatus: "all" | "completed" | "fail" | "pending" | "refund";
  selectedFromDate: Date | null;
  selectedToDate: Date | null;
  sortOrder: "asc" | "desc";
}

export const PaginateTransactions = ({
  currentPage,
  setCurrentPage,
  filterStatus,
  filterType,
  selectedFromDate,
  selectedToDate,
  sortOrder,
}: ITransactionPage) => {
  const navigate = useNavigate();
  const itemsPerPage = 10;
  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "transactions",
      currentPage,
      setCurrentPage,
      filterStatus,
      filterType,
      selectedFromDate,
      selectedToDate,
      sortOrder,
    ],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/api/v1/admin/get-transactions`,
        {
          params: {
            page: currentPage,
            page_limit: itemsPerPage,
            status: filterStatus,
            type: filterType,
            start: selectedFromDate,
            end: selectedToDate,
            sort: sortOrder,
          },
        }
      );
      return response.data.data;
    },
  });
  console.log(data);
  if (isLoading) return "Loading...";
  if (isError) return "Fetching Data Error";

  const handleClick = (transactions: ITransaction) => {
    const { _id } = transactions;
    navigate(`/transaction-list/detail/${_id}`);
  };

  const getID = (index: number) => {
    const customID = (currentPage - 1) * itemsPerPage + index + 1;
    return `${customID.toString().padStart(2, "0")}`;
  };
  const handleClickPage = (e: { selected: number }) => {
    setCurrentPage(e.selected + 1);
  };
  return (
    <>
      <div>
        <Table>
          <TableHeader className="uppercase">
            <TableRow>
              <TableHead className="text-gray-100 font-bold">No.</TableHead>
              <TableHead className="text-gray-100 font-bold">
                Message
              </TableHead>
              <TableHead className="text-gray-100 font-bold ">
                Amount
              </TableHead>
              <TableHead className="text-gray-100 font-bold">Status</TableHead>
              <TableHead className="text-gray-100 font-bold">
                Join Date
              </TableHead>
              <TableHead className="text-gray-100 font-bold">Type</TableHead>
              <TableHead className="text-gray-100 font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.transactions.map(
              (transactions: ITransaction, index: number) => (
                <TableRow key={index}>
                  <td className="pl-3">{getID(index)}</td>
                  <TransactionHistory {...transactions} />
                  <td
                    key={transactions._id}
                    onClick={() => handleClick(transactions)}
                    className="pl-3 text-[#0094FF] font-bold hover:transition-all hover:-translate-y-2 duration-300 cursor-pointer"
                  >
                    View Detail
                  </td>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
      <div id="Paginate" className="border-t pt-4">
        <PaginateComponents
          pageCount={data.pageCount}
          handlePageClick={handleClickPage}
        />
      </div>
    </>
  );
};
