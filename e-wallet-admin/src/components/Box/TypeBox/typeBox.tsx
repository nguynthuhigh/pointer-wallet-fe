import React from "react";


export const selectType = [
    {value: '', name: 'All'},
    {value: 'transfer', name: 'Transfer'},
    {value: 'deposit', name: 'Deposit'},
    {value: 'payment', name: 'Payment'},
    {value: 'withdraw', name: 'Withdraw'},
]

type TypeBoxProps = {
    type:string 
    select: {
        value:string;
        name:string;
    }[]
    handleType: (e:React.ChangeEvent<HTMLSelectElement>) => void
}   

export const TypeBox = ({type,select,handleType} : TypeBoxProps) => {
    return (
        <>
            <div className="relative w-[150px] h-[36px]">
                <select value={type} onChange={handleType} className="font-poppins text-sm w-full h-full pl-[15px] border-[1px] border-gray-300 rounded-[3px] text-[#39325A] outline-none appearance-none">
                    {select.map((items) => (
                        <option key={items.value} value={items.value}>{items.name}</option> 
                    ))}
                </select>
            <span className="absolute top-[-0.5rem] left-[30px] transform -translate-x-1/2 bg-white text-sm text-[#0094FF] px-1">Type</span>
            </div>
        </>
    )
}