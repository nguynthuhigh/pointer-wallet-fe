import CountUp from "react-countup";
export function ItemAsset({ ...props }) {
  return (
    <div className={`bg-${props.color}-50 my-2 h-fit p-3 rounded-xl flex`}>
      <img className="w-10" alt="" src={props.logo}></img>
      <div className="ml-2">
        <h1 className={`text-${props.color}-500 font-semibold text-lg`}>
          <CountUp
            duration={2.5}
            prefix={props.prefix}
            suffix={props.suffix}
            separator={props.separator}
            decimals={props.decimals}
            decimal={props.decimal}
            start={0}
            end={props.end}
          ></CountUp>
        </h1>
        <h1 className={`font-semibold text-sm text-${props.color}-500`}>
          {props.currency}
        </h1>
      </div>
      <h1
        className={`ml-auto my-auto font-semibold text-sm text-${props.color}-500`}
      >
        {props?.percent}%
      </h1>
    </div>
  );
}
