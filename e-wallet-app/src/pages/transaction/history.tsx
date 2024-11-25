import HeaderDefault from "../../components/header/header_default";
import ItemTransaction from "../../components/transaction/item_transaction";
import USDTIcon from "../../assets/svg/usdt.svg";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import { getTransactionPaginate } from "../../services/api/transaction.api";
import Filter from "../../components/transaction/filter";
import Loading from "../loading";

const HistoryTransactions = () => {
  const fetchTransaction = async (page: number) => {
    const response = await getTransactionPaginate(page, 4);
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

  return (
    <div className="container-full">
      <div className="p-4">
        <HeaderDefault title="Lịch sử giao dịch" />
      </div>
      <Filter />
      {data?.pages.flat().map((item, index) => {
        const isLastItem = data.pages.flat().length - 1 === index;
        return (
          <div ref={isLastItem ? ref : undefined} key={index}>
            <ItemTransaction item={item} userID={item.userID} icon={USDTIcon} />
          </div>
        );
      })}
      {isFetchingNextPage && <h1 className="text-center">Đang tải..</h1>}
    </div>
  );
};

export default HistoryTransactions;
