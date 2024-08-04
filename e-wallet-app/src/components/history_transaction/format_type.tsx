
const FormatType = ({...props}) => {
  if(props.type === 'payment'){
    return <h1 className={`w-full font-semibold text-base text-end text-red-500`}>-{props.amount}</h1>
  }
  else{
    return <></>
  }
}

export default FormatType