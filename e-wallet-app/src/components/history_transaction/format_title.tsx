const FormatTitle = ({...props}) => {
  if(props.type === 'transfer'){
    return <h1>1</h1>
  }
  if(props.type === 'payment'){
    return <h1 className={`font-semibold text-base overflow-hidden w-full`}>{props.title}</h1>
  }
  return (
    <h1 className={`font-semibold text-base overflow-hidden w-full`}>Nhận tiền từ undefined</h1>
  )
}

export default FormatTitle