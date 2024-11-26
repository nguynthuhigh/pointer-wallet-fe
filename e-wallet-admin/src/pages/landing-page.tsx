import IconPointer from '../assets/png/LogoP.png'
import ImgDashBoard from '../assets/png/dashboard.png'
import BgLandingPage from '../assets/png/BgLogin.png'
import Wallet from '../assets/png/wallet.png'
import LogoVoucher4U from '../assets/logo-partner/voucher4u.jpg'
export const LandingPage = () => {
    return (
        <>
            <div className="w-full bg-no-repeat bg-cover bg-center space-y-[20px] h-[3000px]" style={{backgroundImage: `url(${BgLandingPage})`}}>
                <div id="Header" className="flex items-center justify-between px-[80px] py-6 w-full ">
                    <div className='flex items-center'>
                        <div id="Logo"><img src={IconPointer} className='w-[100px] h-[80px] object-contain' /></div>
                        <p className='text-[20px] text-white font-semibold'>Pointer Wallet</p>
                    </div>
                    <div id="Nav" className='text-[18px] '>
                        <ul className="flex space-x-[70px] uppercase">
                            <li>Documents</li>
                            <li>Community</li>
                            <li>Download App</li>
                            <li>Payment Gateway</li>
                        </ul>
                    </div>
                    <div id="Login" className='text-[18px] border-[2px] border-gray-600 w-[100px] h-[50px] flex justify-center items-center'>
                        <button>Login</button>
                    </div>
                </div>
                <div id="Content" className='mx-[80px] space-y-[60px]'>
                    <div id='Introduce' className='flex items-center justify-center'>
                        <div id="sideLeft" className='flex items-center]'>
                            <div className='space-y-[20px]'>
                                <p className='text-[56px] text-white font-bold text-left'>Making Every Transaction Smooth <br /> Safe And Simple</p>
                                <p className='text-[22px] text-gray-400'>Your business payment fast and secure <br/>with <span className='text-[#0094FF]'>pointer wallet</span> app </p>
                                <button className='bg-[#0094FF] text-center text-white rounded-full w-[180px] text-lg h-[55px] space-x-[8px]'>
                                    Get Started
                                </button>
                            </div> 
                        </div>
                        <div className=''>
                            <img src={Wallet} className='size-[490px] object-cover'/>
                        </div>
                    </div>
                    <div id="Sponsor" className='text-center space-y-[10px]'>
                        <p className='text-[56px]'>Trusted By More Than <span className='text-[#0094FF]'>+1,000</span> Partners</p>
                        <div id="LogoPartner">
                            <ul className='flex space-x-[10px]'>
                                <li className='flex items-center gap-x-2 font-bold text-lg text-white border-[1px] w-fit rounded-[16px] py-2 px-3'><img src={LogoVoucher4U} className='size-[56px] rounded-full'/>Voucher 4U</li>
                                <li className='flex items-center gap-x-2 font-bold text-lg text-white border-[1px] w-fit rounded-[16px] py-2 px-3'><img src={LogoVoucher4U} className='size-[56px] rounded-full'/>Voucher 4U</li>
                                <li className='flex items-center gap-x-2 font-bold text-lg text-white border-[1px] w-fit rounded-[16px] py-2 px-3'><img src={LogoVoucher4U} className='size-[56px] rounded-full'/>Voucher 4U</li>
                                <li className='flex items-center gap-x-2 font-bold text-lg text-white border-[1px] w-fit rounded-[16px] py-2 px-3'><img src={LogoVoucher4U} className='size-[56px] rounded-full'/>Voucher 4U</li>
                                <li className='flex items-center gap-x-2 font-bold text-lg text-white border-[1px] w-fit rounded-[16px] py-2 px-3'><img src={LogoVoucher4U} className='size-[56px] rounded-full'/>Voucher 4U</li>
                                <li className='flex items-center gap-x-2 font-bold text-lg text-white border-[1px] w-fit rounded-[16px] py-2 px-3'><img src={LogoVoucher4U} className='size-[56px] rounded-full'/>Voucher 4U</li>
                                <li className='flex items-center gap-x-2 font-bold text-lg text-white border-[1px] w-fit rounded-[16px] py-2 px-3'><img src={LogoVoucher4U} className='size-[56px] rounded-full'/>Voucher 4U</li>
                            </ul>
                        </div>
                    </div>
                    <div id="Dashboard-adm">
                        <img src={ImgDashBoard} className='rounded-[20px]' />
                    </div>
                </div>
            </div>
        </>
    )
}