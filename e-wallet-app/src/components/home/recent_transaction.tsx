import ItemTransaction from '../../components/history_transaction/item_transaction'
import USDTIcon from '../../assets/svg/usdt.svg'
import { getTransactionPaginate } from '../../services/api/transaction.api'
import { useQuery } from '@tanstack/react-query'
const RecentTransaction = () => {
  const {data,isLoading} = useQuery({
    queryFn:async ()=>{
      const response = await getTransactionPaginate(1,5)
      return response.data
    },
    queryKey:['recent-transaction']
  })
  return (
    <div>
        {!isLoading ? data?.data.transactions?.map((item:any,key:any)=>(
         <ItemTransaction  item={item} userID={data.data.id} key={key} icon={USDTIcon}/>
        )): 'loading'}

    </div>
  );
};

export default RecentTransaction;
