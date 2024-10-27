import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';

export const selectStatus = [
    { value: 'all', name: "All" },
    { value: 'completed', name: "Completed" },
    { value: 'fail', name: "Fail" },
    { value: 'pending', name: "Pending" },
    { value: 'refund', name: "Refund" },
]

type StatusBoxProps = {
    status: string
    select: {
        value: string;
        name: string;
    }[]
    handleStatus: (e:SelectChangeEvent<string>) => void
}

export const StatusBox = ({ status, select, handleStatus }: StatusBoxProps) => {
    return (
        <>
            <FormControl
                sx={{ m: 1, minWidth: 120 }}
                size="small"
                style={{ color: '#FFFFFF' }}
            >
                <InputLabel id="demo-select-small-label" style={{ color: '#0094FF' }}>Status</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={status}
                    label="Status"
                    onChange={handleStatus}
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