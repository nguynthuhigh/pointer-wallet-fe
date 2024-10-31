import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export const selectType = [
    { value: 'all', name: 'All' },
    { value: 'transfer', name: 'Transfer' },
    { value: 'deposit', name: 'Deposit' },
    { value: 'payment', name: 'Payment' },
    { value: 'withdraw', name: 'Withdraw' },
]

type TypeBoxProps = {
    type: string
    select: {
        value: string;
        name: string;
    }[]
    handleType: (e:SelectChangeEvent<string>) => void
}

export const TypeBox = ({ type, select, handleType }: TypeBoxProps) => {
    return (
        <>
            <FormControl
                sx={{minWidth: 120 }}
                size="small"
                style={{ color: '#FFFFFF' }}
            >
                <InputLabel id="demo-select-small-label" style={{ color: '#0094FF' }}>Type</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={type}
                    label="Status"
                    onChange={handleType}
                    style={{ color: '#9ca3af' }}
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#9ca3af'
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#0094FF'
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#0094FF'
                        },
                        '& .MuiSvgIcon-root': {
                            color: '#9ca3af'
                        },
                        backgroundColor: 'transparent',
                    }}
                >
                    {select.map((items) => (
                        <MenuItem key={items.value} value={items.value}>{items.name}</MenuItem>
                    ))}

                </Select>
            </FormControl>

        </>
    )
}