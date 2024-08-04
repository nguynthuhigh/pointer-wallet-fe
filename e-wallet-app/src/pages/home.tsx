import { useEffect, useState } from 'react';
import { Drawer, Button, Box } from '@mui/material';
import CashInIcon from '../assets/svg/cashin.svg'
import USDTIcon from '../assets/svg/usdt.svg'
import ButtonFeature from '../components/home/button_feat';
import Settings_Icon from '../assets/svg/settings.svg'
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    // if (event.type === 'keydown' && (event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift') {
    //   return;
    // }
    setIsOpen(open);
  };

  useEffect(() => {
    document.title = "Wallet";
  }, []);

  return (
    <div>
      <div className="flex">
        <img src={`https://photo.znews.vn/w660/Uploaded/mfnuy/2024_07_30/enzo_fernandez_2004170950.jpg`}
            className={`rounded-full w-[50px] h-[50px] object-cover`}></img>
        <div>
            <h1>Chào buổi sáng</h1>
            <h1>Nguyễn Minh Nguyên</h1>
        </div>
        <img src={Settings_Icon}></img>
      </div>
      <div>
        <h1 className={`font-semibold text-4xl my-6`}>đ100,000,000</h1>
      </div>
      <div className="grid grid-flow-row grid-cols-5 gap-1">
        <ButtonFeature image={CashInIcon} title="Gửi"></ButtonFeature>
        <ButtonFeature image={CashInIcon} title="Nhận"></ButtonFeature>
        <ButtonFeature image={CashInIcon} title="Quét mã"></ButtonFeature>
        <ButtonFeature image={CashInIcon} title="Nạp/Rút"></ButtonFeature>
        <ButtonFeature image={CashInIcon} title="Lịch sử"></ButtonFeature>
      </div>
      <div>
        <div className={`flex justify-between items-center`}>
            <div className={`flex items-center`}>
                <img src={USDTIcon} className={`w-12 h-12`}></img>
                <div className={`ml-2`}>
                    <h1 className={`font-semibold text-xl`}>USDT</h1>
                    <h1>đ23,000</h1>
                </div>
            </div>
            <div >
                <h1 className={`font-semibold text-xl ml-auto`}>100,00</h1>
                <h1>đ2,300,000</h1>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

{/* <div>
<Button variant="contained" onClick={toggleDrawer(true)}>
  Open Bottom Sheet
</Button>
<Drawer
  anchor="bottom"
  open={isOpen}
  onClose={toggleDrawer(false)}
>
  <Box
    sx={{ width: 'auto', padding: '16px', textAlign: 'center', height: '500px' }}
    role="presentation"
    onClick={toggleDrawer(false)}
    onKeyDown={toggleDrawer(false)}
  >
    <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
      Close
    </Button>
  </Box>
</Drawer>
</div> */}
