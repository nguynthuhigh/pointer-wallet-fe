import React from 'react'
import { formatCurrency } from '../../utils/format_currency'
import VND from '../../assets/png/vnd_icon.png'
import USD from '../../assets/png/usd_icon.png'
import ETH from '../../assets/png/eth_icon.png'

interface ItemCurrencyProps{
    balance?:number,
    currency:string
}
const ItemCurrency:React.FC<ItemCurrencyProps> = ({balance,currency}) => {
  return (
    <div class={`rounded-xl bg-gray-100 p-4 flex`}>
   <img
        class={`w-10 h-10 rounded-full object-cover`}
        src={ConvertImage(currency)}
      ></img>
    <div class={`ml-4`}>
      <h1 class={`text-sm text-gray-500`}>Số dư:</h1>
      <h1 class={`text-md`}>
        {formatCurrency(
          balance,currency
        )}
      </h1>
    </div>
  </div>
  )
}
const ConvertImage = (currency:string)=>{
    switch (currency){
        case 'VND':
            return VND
        case 'USD':
            return USD
        case 'ETH':
            return ETH
    }
        
}
export default ItemCurrency