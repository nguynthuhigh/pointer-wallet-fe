import DatePicker from "react-datepicker"

type DateToProps = {
    selectedToDate: Date | null;
    setSelectedToDate: (date: Date | null) => void
}

export const DateTo = ({selectedToDate,setSelectedToDate} : DateToProps) => { 
    return (
        <>
            <DatePicker
                selected={selectedToDate}
                onChange={(date) => setSelectedToDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText='yyyy/mm/dd'
                className="border-[1px] p-1 rounded-[4px] border-gray-300 w-full text-center h-[36px] text-sm outline-none appearance-none"
            />
            <span className=' absolute top-[-0.7rem] left-[30px] transform -translate-x-1/2 bg-white text-[#0094FF] px-1 text-sm'>To:</span>
        </>
    )
}