import HeaderDefault from '../../components/header/header_default'
import ItemTransaction from '../../components/history_transaction/item_transaction'
import USDTIcon from '../../assets/svg/usdt.svg'
import dataTransaction from '../../dummy-data/transaction.json'
import transaction from '../../dummy-data/transaction.json'
import {useInfiniteQuery} from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import {useIntersection} from '@mantine/hooks'
import { getTransactionPaginate } from '../../services/api/transaction.api'

const HistoryTransactions = () => {
  const [userID,setUserID] = useState<string>()
  const [isLoading,setIsLoading] = useState<boolean>(true)
  const fetchTransaction = async(page:number)=>{
    // 
      try {
        const response = await getTransactionPaginate(page)
        if(response.status === 200){
          setUserID(response.data.id)
          setIsLoading(false)
          return response.data.data.transactions

        }
      } catch (error) {
        console.log(error)
      }
    }
  const { data, fetchNextPage, isFetchingNextPage,hasNextPage } = useInfiniteQuery({
    queryKey: ['query'],  
    queryFn: async ({ pageParam = 1 }) => {
      return await fetchTransaction(pageParam);
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length > 0 ? pages.length + 1 : undefined;
    },
    initialPageParam:1,

  });
  const lastTransactionRef = useRef<HTMLElement>(null) 
  const {ref,entry} = useIntersection({
    root:lastTransactionRef.current,
    threshold:1
  })

  useEffect(()=>{
    if(entry?.isIntersecting){
      if (hasNextPage) {
        fetchNextPage();
      }
    }
  },[entry])
  return (
    <div>
        <HeaderDefault title="Lịch sử giao dịch"></HeaderDefault>
        {!isLoading ? data?.pages.flat().map((item,key)=>{
     
            if(data?.pages.flat().length-1 === key){
              return <div ref={ref} class={`w-full bg-blue-300 border h-20`}>
                <ItemTransaction item={item} userID={userID} key={key} icon={USDTIcon}/>
              </div>
            }
            return <ItemTransaction  item={item} userID={userID} key={key} icon={USDTIcon}/>
          }): 'loading'}
          {isFetchingNextPage && 'fetchnext...'}
    </div>
  )
}

export default HistoryTransactions