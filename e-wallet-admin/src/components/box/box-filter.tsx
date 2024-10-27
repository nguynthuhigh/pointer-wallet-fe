import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export type FilterBoxProps = {
    filter: 'all' | 'false' | 'true';
    handleFilterChange: (newFilter: 'all' | 'false' | 'true') => void
}

export const FilterBox = ({ filter, handleFilterChange }: FilterBoxProps) => {
    return (
        <>
            <FormControl
                sx={{minWidth: 120 }}
                size="small"
                style={{ color: '#FFFFFF' }} 
            >
                <InputLabel id="demo-select-small-label" style={{ color: '#0094FF' }}>Status</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={filter}
                    label="Status"
                    onChange={(e: SelectChangeEvent) => handleFilterChange(e.target.value as 'all' | 'false' | 'true')}
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
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="false">Active</MenuItem>
                    <MenuItem value="true">Inactive</MenuItem>
                </Select>
            </FormControl>

        </>
    )

}