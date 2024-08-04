import QRCode from "react-qr-code";
import bg_qrcode from '../../../assets/images/bg_qrcode.png'
import logo_presspay from '../../../assets/images/logo.png'
export default function TabQrCode({dataTransaction}){
    return(<>
          <div className='relative w-[650px] h-[572px] bg-white rounded-[15px]'>
                                <img src={bg_qrcode} alt="" className='w-full h-full'/>
                                <div className='w-full h-full'>
                                    <form className="w-full h-full py-10 absolute z-10 top-0 left-0">
                                        <p className='text-white font-bold text-[20px] justify-center flex'>Quét mã QR để thanh toán</p>
                                        <div className='relative w-full h-[400px]'>
                                            <div className='w-full flex justify-center items-center'>
                                            <QRCode className='p-2 bg-white mt-16 z-0' 
                                                value={dataTransaction?._id ? dataTransaction?._id : '1'} 
                                                imageSettings={{
                                                src:{logo_presspay},
                                                excavate:true
                                            }}></QRCode>
                                            </div>
                                        </div>
                                        <div className='flex flex-col items-center'>
                                            <p className='text-white text-center'>Sử dụng App pressPay hoặc Camera để quét mã</p>
                                            <p className='text-white text-center'>Bạn chưa có ứng dụng? <span className='text-[#0094ff] ml-1'>Tải ngay</span></p>
                                        </div>
                                    </form>
                                </div>

                            </div>  
    </>)
}