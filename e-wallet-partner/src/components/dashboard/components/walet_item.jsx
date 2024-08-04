export  function WalletItem({item}){
    const format = (money, currency)=>{
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
          });
        return formatter.format(money)
    }
    return<div className="p-3 border-[1px] border-t-0 border-x-0 flex items-center ">
        <img className="w-[30px] h-[30px]" alt="" src="https://cryptologos.cc/logos/ethereum-eth-logo.png"></img>
        <div>
            <div className="text-[15px]">
                {item.currency.symbol} Balance
            </div>
            <div className="font-semibold text-[17px]">
                {format(item.balance,item.currency.symbol)}
            </div>
        </div>
    </div>
}
export  function WalletItemLoading(){
    return<div className="p-3 border-[1px] items-center w-full border-t-0 border-x-0 flex">
        <div className="w-[30px] h-[30px] mx-1 rounded-full bg-gray-200" ></div>
        <div>
            <div className="w-[250px] my-2 h-[10px] rounded-full bg-gray-200">
            </div>
            <div className="w-full my-2 h-[10px] rounded-full bg-gray-200">
            </div>
        </div>
    </div>
}