import React, { useEffect, useState } from 'react'
import { ItemAsset } from './item_asset'
import LogoVND from '../../assets/svg/logo_vnd.svg'
import LogoUSD from '../../assets/svg/logoUSD.svg'
import LogoETH from '../../assets/svg/logo_eth.svg'
export const AssetBar = ({...props}) => {
 
  return (
    <div className='pl-2'>
        <div className='relative h-[200px]'>
            <div className=' bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-blue-500 to-90% w-full h-[150px]'></div>
            <img alt='' className='ml-4 absolute bottom-0 rounded-full w-[100px] h-[100px] object-cover shadow-sm border-[5px] border-white' src='https://i.ytimg.com/vi/_H3LCFmys2Q/hqdefault.jpg'></img>
        </div>
        <div>
           <div className='p-4 pt-1'>
            <h1 className='font-semibold font-inter text-3xl'>{props.partner.name}</h1>
            <h1 className='text-gray-600 text-sm'>{props.partner.email}</h1>
           </div>
            <div className='border-t-2 p-4'>
                <h1 className='font-semi-lg my-2'>My Assets</h1>
                <ItemAsset color={'blue'} logo={LogoVND}  end={props.wallet.currencies[0].balance} prefix="₫ " separator="," decimal="" decimals="" currency="Vietnamese Dong"></ItemAsset>
                <ItemAsset color={'green'} logo={LogoUSD}  end={props.wallet.currencies[1].balance} prefix="$ " separator="," decimal="." decimals="2" currency="US Dollar"></ItemAsset>
                <ItemAsset color={'indigo'} logo={LogoETH}  end={props.wallet.currencies[2].balance} prefix="ETH " separator="," decimal="." decimals="2" currency="Ethereum"></ItemAsset>
            </div>
        </div>
    </div>
  )
}
export const AssetBarLoading = () => {
  return (
    <div className='pl-2 '>
        <div className='relative h-[200px]'>
            <div className=' bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-blue-500 to-90% w-full h-[150px]'></div>
            <div alt='' className='ml-4 animate-pulse bg-gray-200 absolute bottom-0 rounded-full w-[100px] h-[100px] object-cover shadow-sm border-[5px] border-white' ></div>
        </div>
        <div className='animate-pulse'>
           <div className='p-4 pt-1 space-y-3'>
            <div className='font-semibold font-inter text-3xl bg-gray-200 rounded-xl h-10'></div>
            <div className='text-gray-600 text-sm bg-gray-200 rounded-lg h-5'></div>
           </div>
            <div className='border-t-2 p-4 space-y-3'>
                <div className='font-semi-lg my-2 bg-gray-200 rounded-lg h-6 w-24'></div>
                <div className='w-full bg-gray-200 h-[60px] rounded-xl'></div>
                <div className='w-full bg-gray-200 h-[60px] rounded-xl'></div>
                <div className='w-full bg-gray-200 h-[60px] rounded-xl'></div>
            </div>
        </div>
    </div>
  )
}

