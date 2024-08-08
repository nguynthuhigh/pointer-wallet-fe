import React, { useState } from 'react';
import { Box, Button, Drawer } from '@mui/material';
import { useNavigate } from 'react-router-dom';
type ApplyVoucherType = () => void;

    interface BottomDrawerProps {
        onClose: ApplyVoucherType;
        state:boolean,
        id:string | null
    }
const ApplyVoucher:React.FC<BottomDrawerProps> = ({onClose,state,id}) => {
    const [otp,setOtp] = useState('')
    const [error,setError] = useState('')
    const navigate = useNavigate()
  
  return (
    <div>
        <div>
            <Drawer
                anchor="bottom"
                open={state}
                onClose={onClose}
                >
                <Box
                    sx={{ width: 'auto', padding: '16px', textAlign: 'center', height: '500px' }}
                    role="presentation"
                    >
                    <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                    Close
                    </Button>
                  
                </Box>
            </Drawer>
        </div> 
    </div>
  )
}

export default ApplyVoucher