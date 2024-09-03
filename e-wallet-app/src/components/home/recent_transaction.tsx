import ItemTransaction from '../../components/history_transaction/item_transaction'
import USDTIcon from '../../assets/svg/usdt.svg'
import { getTransactionPaginate } from '../../services/api/transaction.api'
import { useQuery } from '@tanstack/react-query'
const RecentTransaction = () => {
  // interface Transaction {
  //   id: string;
  // }
  
  // interface PaginatedResponse<T> {
  //   data: {
  //     transaction: T[];
  //     id: string;
  //   };
  // }
  // const {data,isLoading} = useQuery<PaginatedResponse<Transaction>>({
  //   queryFn: 
  //     getTransactionPaginate(1,5)
  //   fr,
  //   queryKey:['recent-transaction']
  // })
  // return (
  //   <div>
  //       {!isLoading ? data?.data.transaction?.map((item:any,key:any)=>(
  //        <ItemTransaction  item={item} userID={data.data.id} key={key} icon={USDTIcon}/>
  //       )): 'loading'}

  //   </div>
  // );
};

export default RecentTransaction;
