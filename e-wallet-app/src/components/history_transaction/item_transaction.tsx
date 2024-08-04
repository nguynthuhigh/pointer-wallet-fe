import FormatType from "./format_type"
import FormatTitle from "./format_title"
const ItemTransaction = ({...props}) => {
    console.log(props)
  return (
    <div className={`flex justify-between items-center`}>
        <div className={`flex items-center`}>
            <img src={props.icon} className={`w-12 h-12`}></img>
            <div className={`ml-2`}>
                <FormatTitle type={props.item.type} title={props.item.title}></FormatTitle>
                <h1 class={`text-sm`}>{props.item.message}</h1>
            </div>
        </div>
        <div >
        <FormatType type={props.item.type} amount={props.item.amount}></FormatType>
        </div>
    </div>
  )
}

export default ItemTransaction