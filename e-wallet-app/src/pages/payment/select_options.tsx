const SelectOptions = () => {
  return (
    <div class={`container-center font-semibold space-y-4`}>
      <h1 class={`text-2xl`}>Chọn cách thanh toán</h1>
      <div class={`space-y-2`}>
        <h1 class={``}>Thanh toán với mã thanh toán</h1>
        <input
          class={`border p-2 rounded-lg focus:outline-blue-500`}
          placeholder={`Nhập mã thanh toán`}
        ></input>
      </div>
      <div class={`space-y-2`}>
        <h1 class={``}>Thanh toán với mã thanh toán</h1>
        <button class={`bg-blue-default text-white p-2 rounded-lg`}>
          Thanh toán ngay
        </button>
      </div>
    </div>
  );
};

export default SelectOptions;
