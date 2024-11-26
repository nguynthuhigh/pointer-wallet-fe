import HeaderDefault from "../../components/header/header_default";
import ItemTransaction from "../../components/transaction/item_transaction";
import USDTIcon from "../../assets/svg/usdt.svg";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import { getTransactionPaginate } from "../../services/api/transaction.api";
import Filter from "../../components/transaction/filter";
import EmptyTrans from "../../assets/png/empty_transaction.jpg";
import Loading from "../loading";
import LoadingIcon from "../../assets/svg/loading.svg";

const HistoryTransactions = () => {
  const fetchTransaction = async (page: number) => {
    const response = await getTransactionPaginate(page, 12);
    if (response.status === 200) {
      return response.data.data.transactions.transactions;
    }
    throw new Error("Failed to fetch transactions");
  };

  const { data, fetchNextPage, isLoading, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["transactions"],
      queryFn: async ({ pageParam = 1 }) => fetchTransaction(pageParam),
      getNextPageParam: (lastPage, pages) =>
        lastPage.length > 0 ? pages.length + 1 : undefined,
      initialPageParam: 1,
    });

  const lastTransactionRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastTransactionRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [entry, hasNextPage, fetchNextPage]);

  if (isLoading) return <Loading />;

  if (!isLoading && data?.pages.flat().length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-gray-500">
        Không có giao dịch nào để hiển thị.
        <img class={`w-60 mx-auto`} src={EmptyTrans}></img>
      </div>
    );
  }

  return (
    <div className="p-4 w-full h-screen bg-white m-2 rounded-lg shadow-xl border flex flex-col">
      <div className="p-4">
        <HeaderDefault title="Lịch sử giao dịch" />
      </div>
      <Filter />
      <div className="flex-1 overflow-y-auto">
        {data?.pages.flat().map((item, index) => {
          const isLastItem =
            data.pages.flat().length - 1 === index && !!item && item._id;

          return (
            <div ref={isLastItem ? ref : undefined} key={index}>
              <ItemTransaction
                item={item}
                userID={item.userID}
                icon={USDTIcon}
              />
            </div>
          );
        })}
        {isFetchingNextPage && (
          <div className="flex justify-center items-center w-full mt-4">
            <img
              className="animate-spin w-5 h-5"
              src={LoadingIcon}
              alt="Loading"
            />
          </div>
        )}

        {!hasNextPage && (
          <h1 className="text-center mt-4 text-gray-500">
            Đã hiển thị tất cả giao dịch
          </h1>
        )}
      </div>
    </div>
  );
};

export default HistoryTransactions;
