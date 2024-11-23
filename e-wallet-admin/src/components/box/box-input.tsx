import { InputProps } from "@/interfaces/input-item"

export const BoxInput = ({ type, icon:ICon, name, value, onChange }: InputProps) => {
    return (
        <>
            <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <ICon className='size-5 text-blue-500' />
                </div>
                <input
                    type={type}
                    placeholder={name}
                    value={value}
                    onChange={onChange}
                    className="w-full pl-10 pr-3 py-2 bg-gray-600 bg-opacity-50 rounded-lg border border-slate-400
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all duration-200 outline-none"
                />
            </div>
        </>
    )
}