import { useEffect, useState } from 'preact/compat';
// import { Drawer, Button, Box } from '@mui/material';
import CashInIcon from '../assets/svg/cashin.svg'
import USDTIcon from '../assets/svg/usdt.svg'
import ButtonFeature from '../components/home/button_feat';
import ItemCurrency from '../components/home/item_currency';
import Settings_Icon from '../assets/svg/settings.svg';
import HistoryIcon from '../assets/svg/history_trans.svg'
import Loading from './loading';
const Home = () => {
  // const [isOpen, setIsOpen] = useState(false);

  // const toggleDrawer = (open: boolean) => () => {
  //   // if (event.type === 'keydown' && (event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift') {
  //   //   return;
  //   // }
  //   setIsOpen(open);
  // };

  useEffect(() => {
    document.title = "Wallet";
  }, []);
  const [isLoading,setIsLoading] = useState(false)
  if(isLoading){
    return <Loading></Loading>
  }
  return (
    <div>
      <div className="flex">
        <img src={`https://photo.znews.vn/w660/Uploaded/mfnuy/2024_07_30/enzo_fernandez_2004170950.jpg`}
            className={`rounded-full w-[50px] h-[50px] object-cover`}></img>
        <div class={`mx-3 h-full my-auto`}>
            <h1 className={`text-gray-500 text-sm`}>Chào buổi sáng</h1>
            <h1 class={`font-semibold text-lg`}>Nguyễn Minh Nguyên</h1>
        </div>
        <img class={`ml-auto hover:rotate-90 w-6 h-6 cursor-pointer`} src={Settings_Icon}></img>
      </div>
      <div>
        <h1 className={`font-semibold text-4xl  my-6`}>đ100,000,000</h1>
      </div>
      <div className="grid grid-flow-row grid-cols-5 gap-1">
        <ButtonFeature image={CashInIcon} title="Gửi"></ButtonFeature>
        <ButtonFeature image={HistoryIcon} title="Nhận"></ButtonFeature>
        <ButtonFeature image={CashInIcon} title="Quét mã"></ButtonFeature>
        <ButtonFeature image={CashInIcon} title="Nạp/Rút"></ButtonFeature>
        <ButtonFeature link='/transaction/history' image={HistoryIcon} title="Lịch sử"></ButtonFeature>
      </div>
      <div class={`h-[1px] w-full bg-button-hover my-5`}></div>
      <h1 class={`my-5 text-2xl font-semibold`}>Tài sản</h1>
      <ItemCurrency image={USDTIcon}></ItemCurrency>
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
