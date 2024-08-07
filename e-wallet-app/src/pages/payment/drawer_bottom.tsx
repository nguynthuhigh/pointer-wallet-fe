import React, { useState } from 'react';
import { Box, Button, Drawer } from '@mui/material';
import OTPInput from 'react-otp-input';
import { confirmPaymentAPI } from '../../services/api/payment.api';
import { useNavigate } from 'react-router-dom';
type DrawerFunction = () => void;

    interface BottomDrawerProps {
        onClose: DrawerFunction;
        state:boolean,
        id:string | null
    }
const DrawerBottom:React.FC<BottomDrawerProps> = ({onClose,state,id}) => {
    const [otp,setOtp] = useState('')
    const [error,setError] = useState('')
    const navigate = useNavigate()
    const handleChangeOTP =async (value:string) => {
        setOtp(value);
        const body = {
            security_code:value,
            transactionID:id
        }
        if(value.length === 6){
          const response = await confirmPaymentAPI(body)
          if(response.status === 200){
            navigate('/')
          }
        }
      };
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
                   <div class={`mx-auto w-fit  border p-4 rounded-full`}>
                     <OTPInput
                        value={otp}
                        onChange={handleChangeOTP}
                        numInputs={6}
                        inputType='password'
                        renderInput={({style,...props}) => <input class={`rounded-full text-center font-semibold   border w-5 h-5  mx-2 bg-gray-50  ${error && 'border-red-500'}`} {...props} />}
                        />
                   </div>
                </Box>
            </Drawer>
        </div> 
    </div>
  )
}

export default DrawerBottom