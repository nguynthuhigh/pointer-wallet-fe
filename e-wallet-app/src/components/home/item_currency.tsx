import { formatCurrency } from "../../utils/format_currency";

export const ItemCurrency = ({ ...props }) => {
  const data = props.item;
  return (
    <div className={`flex justify-between items-center my-4`}>
      <div className={`flex items-center`}>
        <img src={props.image} className={`w-12 h-12`}></img>
        <div className={`ml-2`}>
          <h1 className={`font-semibold text-xl`}>{props.name}</h1>
        </div>
      </div>
      <div>
        <h1 className={`w-full font-semibold text-xl text-end`}>
          {formatCurrency(data?.balance, props.symbol)}
        </h1>
      </div>
    </div>
  );
};
export const ItemCurrencyLoading = () => {
  return (
    <div className={`flex animate-pulse justify-between items-center my-4`}>
      <div className={`flex items-center`}>
        <div className={`bg-gray-200 rounded-full w-12 h-12`}></div>
        <div className={`ml-2`}>
          <h1
            className={`text-xl w-[200px] mb-2 rounded-full h-4 bg-gray-200`}
          ></h1>
          <h1
            className={` text-xl w-[150px] rounded-full h-4 bg-gray-200`}
          ></h1>
        </div>
      </div>
      <div>
        <h1
          className={`w-[100px] mb-2 rounded-full h-4 bg-gray-200 text-xl text-end`}
        ></h1>
        <h1 class={`w-[50px] mb-2 rounded-full h-4 bg-gray-200 ml-auto`}></h1>
      </div>
    </div>
  );
};
