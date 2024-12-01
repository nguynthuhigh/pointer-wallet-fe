import { ChevronDown } from 'lucide-react'
import { useState } from 'react';


type StatusBoxProps = {
    status: string
    select: {
        value: string;
        name: string;
    }[]
    handleStatus: (e:React.ChangeEvent<HTMLSelectElement>) => void
}

export const StatusBox = ({ status, select, handleStatus }: StatusBoxProps) => {
    const [isFocus,setIsFocus] = useState<boolean>(false)
    
    return (
        <>
            <div className='text-black'>
                <p className='text-blue-500 text-md mb-1 font-medium'>Status</p>
                <div className='relative flex items-center border-[1px] border-gray-400 rounded-[6px] text-gray-100 hover:border-blue-500 transition-colors duration-300 '>
                    <select
                        value={status}
                        onChange={(e) => {handleStatus(e); setIsFocus(false)}}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        className='pl-3 h-[40px]  w-[180px] appearance-none bg-transparent outline-none focus:border-blue-500 '>
                        {select.map((items) => (
                            <option className='text-black' key={items.value} value={items.value}>{items.name}</option>
                        ))}
                    </select>
                    <span className={`absolute inset-y-0  right-3 flex items-center pointer-events-none transition-transform duration-300 ${isFocus ? 'rotate-180' : 'rotate-0'}`}>
                         <ChevronDown/> 
                    </span>
                </div>
            </div>
        </>
    )
}