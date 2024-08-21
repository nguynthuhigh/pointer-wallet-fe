import ItemTransaction from '../../components/history_transaction/item_transaction'
import USDTIcon from '../../assets/svg/usdt.svg'
import { useEffect, useRef, useState } from 'react'
import { getTransactionPaginate } from '../../services/api/transaction.api'
import { TransactionData } from '../../types/transfer'
const RecentTransaction = () => {
  const [userID,setUserID] = useState<string>()
  const [isLoading,setIsLoading] = useState<boolean>(true)
  const [transactionData,setTransactionData] = useState<unknown>(null)
  
  useEffect(()=>{
    const fetchTransaction = async()=>{
      try {
        console.log(1)
        const response = await getTransactionPaginate(2,5)
        if(response.status === 200){
          setUserID(response.data.data.id)
          setTransactionData(response.data.data.transactions)
          console.log(response.data.data.transactions)
          setIsLoading(false)
        }
      } catch (error) {
      }
    }
    fetchTransaction()
  },[])




  return (
    <div>
        {!isLoading ? transactionData?.map((item:any,key:any)=>(
         <ItemTransaction  item={item} userID={userID} key={key} icon={USDTIcon}/>
        )): 'loading'}
    </div>
  )
}

export default RecentTransaction