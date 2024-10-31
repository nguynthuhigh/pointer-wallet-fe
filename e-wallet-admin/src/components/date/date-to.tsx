import DatePicker from "react-datepicker"
import TextField from '@mui/material/TextField';
import "react-datepicker/dist/react-datepicker.css";

type DateToProps = {
    selectedToDate: Date | null;
    setSelectedToDate: (date: Date | null) => void
}

export const DateTo = ({ selectedToDate, setSelectedToDate }: DateToProps) => {
    return (
        <>
            <DatePicker
                selected={selectedToDate}
                onChange={(date) => setSelectedToDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText='yyyy/mm/dd'
                customInput={
                    <TextField
                        label='To'
                        size="small"
                        variant="outlined"
                        slotProps={{
                            inputLabel: {
                                shrink:true,
                                style: {color: '#0094FF'}
                            },
                            input: {
                               style: {color: '#9ca3af'}
                            }
                        }}
                        sx={{
                            width: '170px',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '4px',
                                '& fieldset': {
                                    borderColor: '#9ca3af',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#0094FF'
                                }
                            }
                        }}
                    />
                }
            />
        </>
    )
}