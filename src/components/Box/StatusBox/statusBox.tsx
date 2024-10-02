
export const selectStatus = [
    {value: 'all',name: "All"},
    {value: 'completed',name: "Completed"},
    {value: 'fail',name: "Fail"},
    {value: 'pending',name: "Pending"},
    {value: 'refund',name: "Refund"},
]

type StatusBoxProps = {
    status:string
    select: {
        value: string;
        name: string;
    }[]
    handleStatus: (e:React.ChangeEvent<HTMLSelectElement>) => void
}

export const StatusBox = ({status,select,handleStatus}:StatusBoxProps) => {
    return (
        <>
        <div className="relative w-[150px] h-[36px]">
            <select value={status} onChange={handleStatus} className="font-poppins text-sm w-full h-full pl-[15px] border-[1px] border-gray-300 rounded-[3px] text-[#39325A] outline-none appearance-none">
                {select.map((items) => (
                    <option key={items.value} value={items.value}> {items.name}</option>
                ))}
            </select>
            <span className="absolute top-[-0.5rem] left-[35px] transform -translate-x-1/2 bg-white text-sm text-[#0094FF] px-1">Status</span>
        </div>
        </>
    )
}