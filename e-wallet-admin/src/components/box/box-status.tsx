import { ChevronDown } from 'lucide-react'


type StatusBoxProps = {
    status: string
    select: {
        value: string;
        name: string;
    }[]
    handleStatus: (e:React.ChangeEvent<HTMLSelectElement>) => void
}

export const StatusBox = ({ status, select, handleStatus }: StatusBoxProps) => {
    return (
        <>
            <div className='text-black'>
                <p className='text-blue-500 text-md mb-1'>Status</p>
                <div className='relative flex items-center border-[1px] border-gray-500 rounded-[5px] text-gray-100'>
                    <select
                        value={status}
                        onChange={handleStatus}
                        className='pl-3 h-[40px] w-[200px] appearance-none bg-transparent outline-none'>
                        {select.map((items) => (
                            <option className='text-black' key={items.value} value={items.value}>{items.name}</option>
                        ))}
                    </select>
                    <span className=' absolute inset-y-0 right-3 flex items-center pointer-events-none'>
                        <ChevronDown/>
                    </span>
                </div>
            </div>
        </>
    )
}