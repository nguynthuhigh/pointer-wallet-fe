import DatePicker from "react-datepicker";

type DateFromProps = {
    selectedFromDate: Date | null
    setSelectedFromDate: (date:Date | null) => void
}


export const DateFrom = ({selectedFromDate,setSelectedFromDate}: DateFromProps) => {
    return (
        <>
        <DatePicker
            selected={selectedFromDate}
            onChange={(date) => setSelectedFromDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText='yyyy/mm/dd'
            className={`border-[1px] p-1 rounded-[4px] border-gray-300 w-full h-[36px] text-center text-sm`}
            />
            <span className=' absolute top-[-0.5rem] left-[35px] bg-white text-[#0094FF] text-sm transform -translate-x-1/2'>From:</span>
        </>
    )
}