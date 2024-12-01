import DatePicker from "react-datepicker";

type DateToProps = {
  selectedToDate: Date | null ;
  setSelectedToDate: (date: Date | null) => void;
};

export const DateTo = ({
    selectedToDate,
    setSelectedToDate,
}: DateToProps) => {
  return (
    <>
      <div className="text-white">
        <p className="text-blue-500 font-medium mb-1">
          Date To
        </p>
        <div>
          <DatePicker
            selected={selectedToDate}
            onChange={(date) => setSelectedToDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="yyyy-mm-dd"
            className="text-center h-[42px] w-[180px] bg-transparent outline-none border-[1px] border-gray-400 rounded-[6px] focus:border-blue-500 hover:border-blue-500"
          />
        </div>
      </div>


    </>
  );
};
