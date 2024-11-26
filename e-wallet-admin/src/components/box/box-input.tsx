import { ChangeEvent } from "react"

interface InputBox {
    icon: React.ElementType
    name: string,
    value: string,
    type: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const InputBox = ({icon:Icon,name,value,type,onChange}: InputBox) => {
    return (
        <>
            <div className=" relative mb-6">   
                <div className=" absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                    <Icon className='size-5 text-blue-500'/>
                </div>
                <input
                    type={type}
                    placeholder={name}
                    value={value}
                    onChange={onChange}
                    className="w-full pl-10 py-2 bg-gray-800 bg-opacity-50 rounded-[6px] border border-gray-400 placeholder-gray-400 transition-all duration-300 outline-none focus:ring-2 focus:border-blue-500 "
                />
            </div>
        </>
    )
}