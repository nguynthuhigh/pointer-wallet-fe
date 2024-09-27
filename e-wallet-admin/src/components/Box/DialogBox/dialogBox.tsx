import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ImWarning } from "react-icons/im";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../API/axiosInstance';
import { useParams } from 'react-router-dom';

export default function AlertDialog() {
  const {id} = useParams();
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const {mutate} = useMutation({
    mutationKey: ['ban-user'],
    mutationFn: async ()=>{
      return await axiosInstance.patch('/api/v1/user/ban-user',{id})
    },
    onSuccess:()=>{
      setOpen(false);
      console.log("Invalidation key", ['users'])
      queryClient.invalidateQueries({queryKey: ['users']})
      console.log('ok')
    },
    onError:(e:Error)=>{
      console.log(e)
    }
    
  })
  const handleBan = () =>{
    mutate()
  }

  return (
    <React.Fragment>
        <div id="BanUser" onClick={handleClickOpen} className="border-[1px] text-[#FF1717] border-gray-300 bg-white w-fit h-fit  p-3 rounded-[16px] hover:bg-[#FF1717] hover:text-white hover:border-[#FF1717] hover:shadow-lg hover:shadow-[#FF1717]/50 transition-all duration-300 cursor-pointer">
            <button >Ban User</button>
        </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >     
        <div className='flex flex-col items-center justify-center font-bold mt-[10px]'>
            <ImWarning className=' text-[#FF1717]' size={50}/>
            <DialogTitle id="alert-dialog-title" sx={{ color: '#FF1717', fontSize: '24px', font: 'poppins'}}>
            {"WARNING !"}
            </DialogTitle>
        </div> 
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{color: 'black'}}>
            This action will disable the user's account. Do you continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{marginBottom: '10px', marginRight: '15px'}}>
          <button onClick={handleClose} className='border-[1px] rounded-[16px] text-md px-4 py-3 font-poppins cursor-pointer'>Cancel</button>
          <button onClick={handleBan} className='border-[1px] rounded-[16px] text-md px-4 py-3 font-poppins bg-[#FF1717] text-white cursor-pointer'>Argee</button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
