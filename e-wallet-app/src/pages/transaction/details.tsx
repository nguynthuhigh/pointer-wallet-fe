import React from "react"
import HeaderDefault from "../../components/header/header_default"
import TransactionInfo from "../../components/transaction/transaction_info"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import Loading from "../loading"
import { getTransactionDetails } from "../../services/api/transaction.api"
import InfoDetails from "../../components/transaction/info_details"
const TransactionDetails:React.FC = () => {
  const [searchParams] = useSearchParams()
  const transactionID = searchParams.get('id') || ''

  const {data,isLoading,isError} = useQuery({
    queryFn: async ()=>{
      const response = await getTransactionDetails(transactionID)
      return response.data.data
    },
    queryKey:['transaction-details',transactionID],
    refetchOnWindowFocus:false
  })
  if(isLoading){
    return <Loading></Loading>
  }
  if(isError){
    return <h1>Transaction not found</h1>
  }
  return (
    <div class={`container-center font-semibold`}>
      <HeaderDefault  title={'Chi tiết giao dịch'}></HeaderDefault>
      <TransactionInfo {...data}></TransactionInfo>
      <InfoDetails {...data}></InfoDetails>
    </div>
  )
}

export default TransactionDetails