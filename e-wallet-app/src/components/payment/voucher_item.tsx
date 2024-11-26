const VoucherItem = ({ ...props }) => {
  const data = props.data;
  return (
    <div class={`bg-blue-50 rounded-xl my-2`}>
      <div class={`p-2 flex`}>
        <img
          class={`rounded-lg w-14 h-14 object-cover`}
          src={data.image ? data.image : ""}
        ></img>
        <div>
          <h1>{data.title}</h1>
        </div>
      </div>
      <div class={`flex items-center`}>
        <div class={`bg-white w-2 h-4 rounded-r-full`}></div>
        <div class={` w-full border-[1px] border-dashed border-white `}></div>
        <div class={`bg-white w-2 h-4 rounded-l-full`}></div>
      </div>
      <div class={`p-2 flex`}>
        <div class={`flex font-semibold text-blue-default`}>
          <h1>Còn lại:</h1>
          <h1 class={`ml-2`}>{data.quantity}</h1>
        </div>
        {props.amount > data.min_condition ? (
          <button
            onClick={() => {
              props.onClick(data.code);
            }}
            class={`w-[100px] ml-auto p-1.5 text-sm bg-blue-default text-white font-semibold rounded-lg `}
          >
            Sử dụng
          </button>
        ) : (
          <button
            disabled
            class={`w-[150px] ml-auto p-1.5 text-sm bg-gray-100 text-black font-semibold rounded-lg `}
          >
            Không đủ điều kiện
          </button>
        )}
      </div>
    </div>
  );
};

export default VoucherItem;
