import FormatTypeCurrency from "./format_type"
import FormatTitle from "./format_title"
import { formatDate } from "../../utils/format_date"
import { Link } from "react-router-dom"
import FormatIcon from "./format_icon"

const ItemTransaction = ({...props}) => {
  return (
    <div class={`py-1`}>
      <Link to={`/transaction/details?id=${props.item._id}`}>
        <div className={`flex justify-between items-center my-2 py-1 px-4 hover:bg-button-hover cursor-pointer`}>
            <div className={`flex items-center`}>
                <FormatIcon type={props.item.type}></FormatIcon>
                <div className={`ml-2`}>
                    <FormatTitle item={props.item} userID={props.userID}></FormatTitle>
                    <h1 class={`text-sm`}>{formatDate(props.item.createdAt)}</h1>
                </div>
            </div>
            <div >
            <FormatTypeCurrency item={props.item} userID={props.userID}></FormatTypeCurrency>
            </div>
        </div>
      </Link>
    </div>
  )
}

export default ItemTransaction