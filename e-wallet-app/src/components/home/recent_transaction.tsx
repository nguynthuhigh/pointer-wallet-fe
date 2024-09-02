import ItemTransaction from "../../components/history_transaction/item_transaction";
import USDTIcon from "../../assets/svg/usdt.svg";
import { useEffect, useState } from "react";
import { getTransactionPaginate } from "../../services/api/transaction.api";
const RecentTransaction = () => {
  const [userID, setUserID] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await getTransactionPaginate(2, 5);
        if (response.status === 200) {
          setUserID(response.data.data.id);
          setTransactionData(response.data.data.transactions);
          console.log(response.data.data.transactions);
          setIsLoading(false);
        }
      } catch (error) {}
    };
    fetchTransaction();
  }, []);

  return (
    <div>
      {!isLoading
        ? transactionData?.map((item: any, key: any) => (
            <ItemTransaction
              item={item}
              userID={userID}
              key={key}
              icon={USDTIcon}
            />
          ))
        : "loading"}
    </div>
  );
};

export default RecentTransaction;
