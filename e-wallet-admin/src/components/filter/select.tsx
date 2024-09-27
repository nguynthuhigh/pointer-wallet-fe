import React, { useState } from "react";
interface SelectProps {
    select:{
        value:string 
        name:string
    }[]
    handleType: (value:string)=>void
}
const Select:React.FC<SelectProps> = ({select,handleType}) => {
    const [type,setType] = useState('');
        
const handleTypeFC = (e:React.ChangeEvent<HTMLSelectElement>) => {
    handleType(e.target.value as string)
    setType(e.target.value as string)
}
  return (
    <div className="relative w-[150px] h-[36px]">
        <select value={type} onChange={handleTypeFC} className="font-poppins text-sm w-full h-full pl-[15px] border-[1px] border-gray-300 rounded-[3px] text-[#39325A] outline-none appearance-none">
            {select.map((item)=>(
                <option value={item.value}>{item.name}</option>
            ))}
        </select>
        <span className="absolute top-[-0.5rem] text-sm left-[30px] transform -translate-x-1/2 bg-white text-[#0094FF] px-1">Type</span>
    </div>
  )
}

export default Select
