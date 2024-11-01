import DatePicker from "react-datepicker";
import TextField from "@mui/material/TextField";

type DateFromProps = {
  selectedFromDate: Date | null;
  setSelectedFromDate: (date: Date | null) => void;
};

export const DateFrom = ({
  selectedFromDate,
  setSelectedFromDate,
}: DateFromProps) => {
  return (
    <>
      <DatePicker
        selected={selectedFromDate}
        onChange={(date) => setSelectedFromDate(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="yyyy/mm/dd"
        customInput={
          <TextField
            label="From"
            size="small"
            variant="outlined"
            slotProps={{
              inputLabel: {
                shrink: true,
                style: { color: "#0094FF" },
              },
              input: {
                style: { color: "#9ca3af" },
              },
            }}
            sx={{
              width: "170px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "4px",
                "& fieldset": {
                  borderColor: "#9ca3af",
                },
                "&:hover fieldset": {
                  borderColor: "#0094FF",
                },
              },
            }}
          />
        }
      />
    </>
  );
};
