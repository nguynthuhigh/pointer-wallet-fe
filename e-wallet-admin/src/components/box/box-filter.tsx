import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export type FilterBoxProps = {
    filter: 'all' | 'false' | 'true';
    handleFilterChange: (newFilter: 'all' | 'false' | 'true') => void
}

export const FilterBox = ({ filter, handleFilterChange }: FilterBoxProps) => {
    const [isFocus,setIsFocus] = useState<boolean>(false)

    return (
        <>
            <div className='text-black'>
                <p className='text-blue-500 text-md mb-1 font-medium'>Status</p>
                <div className='relative flex items-center border-[1px] border-gray-400 rounded-[6px] text-gray-100 hover:border-blue-500 transition-colors duration-300 '>
                    <select
                        value={filter}
                        onChange={(e) => { handleFilterChange(e.target.value as 'all' | 'false' | 'true'); setIsFocus(false) }}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        className='pl-3 h-[40px] w-full lg:w-[180px] appearance-none bg-transparent outline-none focus:border-blue-500'>
                            <option value="all" className='text-black'>All</option>
                            <option value="false" className='text-black'>Active</option>
                            <option value="true" className='text-black'>Inactive</option>
                    </select>
                    <span className={`absolute inset-y-0 right-3 flex items-center pointer-events-none transition-transform duration-300 ${isFocus ? 'rotate-180' : 'rotate-0'}`}>
                        <ChevronDown />
                    </span>
                </div>
            </div>
        </>
    )

}