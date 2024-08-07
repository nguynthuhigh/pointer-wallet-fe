import { useState } from "react";
export function ItemInfo({...props}){
    const handleCopy = (key) => {
        navigator.clipboard.writeText(key).then(() => {
            alert('copied')
        }).catch(err => {
          console.error('Failed to copy text: ', err);
        });
      };
    return(
        <div className='mr-20'>
            <h1 className=' text-[#8E8E8E]'>{props.title}</h1>
            <button onClick={()=>{handleCopy(props.info)}} className='hover:text-blue-300 font-bold text-lg text-ellipsis w-[250px] overflow-hidden'>{props.info}</button>
        </div>
    )
}
export function ItemInfoLoading({...props}){
    return(
        <div className='mr-20 animate-pulse'>
            <div className=' rounded-full bg-gray-400 w-[100px] h-[20px]'></div>
            <div className=' rounded-full bg-gray-400 w-[200px] mt-2 h-[20px]'></div>
        </div>
    )
}