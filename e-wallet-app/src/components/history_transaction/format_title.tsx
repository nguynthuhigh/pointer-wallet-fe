const FormatTitle = ({...props}) => {
  const transactionData:any = props?.item
  if(transactionData?.type === 'transfer' && transactionData.sender._id === props.userID){
    return <h1 className={`font-semibold text-base overflow-hidden w-full`}>Chuyển tiền đến {transactionData?.receiver?.full_name}</h1>
  }
  if(transactionData?.type === 'transfer' && transactionData.sender._id !== props.userID){
    return <h1 className={`font-semibold text-base overflow-hidden w-full`}>Nhận tiền từ {transactionData?.receiver?.full_name}</h1>
  }
  if(transactionData?.type === 'payment'){
    return <h1 className={`font-semibold text-base overflow-hidden w-full`}>{transactionData?.title}</h1>
  }
  if(transactionData?.type === 'refund'){
    return <h1 className={`font-semibold text-base overflow-hidden w-full`}>{transactionData?.title}</h1>
  }
  if(transactionData?.type === 'deposit'){
    return <h1 className={`font-semibold text-base overflow-hidden w-full`}>{transactionData?.title}</h1>
  }
  
  return (
    <h1 className={`font-semibold text-base overflow-hidden w-full`}>No title</h1>
  )
}

export default FormatTitle