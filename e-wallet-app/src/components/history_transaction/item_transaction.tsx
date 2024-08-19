import FormatTypeCurrency from "./format_type"
import FormatTitle from "./format_title"
import { formatDate } from "../../utils/format_date"
import { Link } from "react-router-dom"
const ItemTransaction = ({...props}) => {
  return (
    <div ref={props.ref}>
      <Link to={`/transaction/details?id=${props.item._id}`}>
        <div className={`flex justify-between items-center my-2 py-1 px-4 hover:bg-button-hover cursor-pointer`}>
            <div className={`flex items-center`}>
                <img src={props.a} className={`w-12 h-12 my-auto`}></img>
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