import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DateFromProps = {
  selectedFromDate: Date | null 
  setSelectedFromDate: (date: Date | null ) => void;
};

export const DateFrom = ({
  selectedFromDate,
  setSelectedFromDate,
}: DateFromProps) => {
  return (
    <>
      <div className="text-white">
        <p className="text-blue-500 font-medium mb-1">
          Date From
        </p>
        <div>
          <DatePicker
            selected={selectedFromDate}
            onChange={(date) => setSelectedFromDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="yyyy-mm-dd"
            className="text-center h-[42px] w-[120px] bg-transparent outline-none border-[1px] border-gray-400 rounded-[6px] focus:border-blue-500 hover:border-blue-500"
          />
        </div>
      </div>


    </>
  );
};
