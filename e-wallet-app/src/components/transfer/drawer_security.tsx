import React, { useState } from 'react';
import { Box, Button, Drawer } from '@mui/material';
import OTPInput from 'react-otp-input';
import { confirmPaymentAPI } from '../../services/api/payment.api';
import { useNavigate } from 'react-router-dom';
import { DataSend } from '../../types/transfer';
import { sendMoneyAPI } from '../../services/api/transfer.api';
import {  } from 'react-router-dom';
type DrawerFunction = () => void;

    interface BottomDrawerProps {
        onClose: DrawerFunction;
        state:boolean,
        data:DataSend
    }
const DrawerBottom:React.FC<BottomDrawerProps> = ({onClose,state,data}) => {
    const [otp,setOtp] = useState('')
    const [error,setError] = useState('')
    const navigate = useNavigate()
    const handleChangeOTP =async (value:string) => {
        setOtp(value);
        if(value.length ===6){
            const body = {
                ...data,
                security_code:value
            }
            try {
                const response = await sendMoneyAPI(body)
                if(response.status === 200){
                    navigate('/')
                }
            } catch (error) {
                console.log(error)
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
                        renderInput={({style,...props}) => <input inputmode={`numeric`} pattern="[0-9]*" class={`rounded-full  text-center font-semibold   border w-5 h-5  mx-2 bg-gray-50  ${error && 'border-red-500'}`} {...props} />}
                        />
                   </div>
                </Box>
            </Drawer>
        </div> 
    </div>
  )
}

export default DrawerBottom