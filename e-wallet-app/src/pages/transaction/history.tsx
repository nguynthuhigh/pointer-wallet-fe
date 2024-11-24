import HeaderDefault from "../../components/header/header_default";
import ItemTransaction from "../../components/transaction/item_transaction";
import USDTIcon from "../../assets/svg/usdt.svg";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import { getTransactionPaginate } from "../../services/api/transaction.api";
import Filter from "../../components/transaction/filter";

const HistoryTransactions = () => {
  const [userID, setUserID] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchTransaction = async (page: number) => {
    const response = await getTransactionPaginate(page, 12);
    if (response.status === 200) {
      setUserID(response.data.data.id);
      setIsLoading(false);
      return response.data.data.transactions.transactions;
    }
  };
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["query"],
      queryFn: async ({ pageParam = 1 }) => {
        return await fetchTransaction(pageParam);
      },
      getNextPageParam: (lastPage, pages) => {
        return lastPage.length > 0 ? pages.length + 1 : undefined;
      },
      initialPageParam: 1,
    });
  const lastTransactionRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastTransactionRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      if (hasNextPage) {
        fetchNextPage();
      }
    }
  }, [entry]);
  return (
    <div class={`container-full `}>
      <div class={` p-4 `}>
        <HeaderDefault title="Lịch sử giao dịch"></HeaderDefault>
      </div>
      <Filter></Filter>
      {!isLoading
        ? data?.pages.flat().map((item, key) => {
            if (data?.pages.flat().length - 1 === key) {
              return (
                <div ref={ref}>
                  <ItemTransaction
                    item={item}
                    userID={userID}
                    key={key}
                    icon={USDTIcon}
                  />
                </div>
              );
            }
            return (
              <ItemTransaction
                item={item}
                userID={userID}
                key={key}
                icon={USDTIcon}
              />
            );
          })
        : "loading"}
      {isFetchingNextPage && <h1 class={`text-center`}>Đang tải..</h1>}
    </div>
  );
};

export default HistoryTransactions;
