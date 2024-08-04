const ItemCurrency = ({...props}) => {
  return (
    <div className={`flex justify-between items-center`}>
        <div className={`flex items-center`}>
            <img src={props.image} className={`w-12 h-12`}></img>
            <div className={`ml-2`}>
                <h1 className={`font-semibold text-xl`}>USDT</h1>
                <h1>đ23,000</h1>
            </div>
        </div>
        <div >
            <h1 className={`w-full font-semibold text-xl text-end`}>100,00</h1>
            <h1>đ2,300,000</h1>
        </div>
    </div>
  )
}

export default ItemCurrency