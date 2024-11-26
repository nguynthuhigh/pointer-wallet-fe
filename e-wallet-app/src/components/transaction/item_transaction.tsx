import FormatTypeCurrency from "./format_type";
import FormatTitle from "./format_title";
import { formatDate } from "../../utils/format_date";
import { Link } from "react-router-dom";
import FormatIcon from "./format_icon";

const ItemTransaction = ({ ...props }) => {
  if (!props.item || !props.item._id) {
    return null;
  }

  return (
    <div className="py-1">
      <Link to={`/transaction/details?id=${props.item._id}`}>
        <div className="flex justify-between items-center my-2 py-1 px-4 hover:bg-button-hover cursor-pointer">
          <div className="flex items-center">
            <FormatIcon type={props.item.type} />
            <div className="ml-2">
              <FormatTitle item={props.item} userID={props.userID} />
              <h1 className="text-sm">{formatDate(props.item.createdAt)}</h1>
            </div>
          </div>
          <div>
            <FormatTypeCurrency item={props.item} userID={props.userID} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ItemTransaction;
