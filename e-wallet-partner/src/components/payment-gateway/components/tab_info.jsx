import format from '../../../utils/format'
import Countdown from 'react-countdown';
export default function TabInfo({dataTransaction,currency,handleTab}){
    return(<>
           <form className='px-7 py-5 w-[310px] h-[572px] bg-white rounded-[15px]'>
                <p className='font-bold text-[20px] justify-center flex'>Thông tin giao dịch</p>
                <div className='mt-5'>
                    <p className='text-[#959595]'>Số tiền thanh toán</p>
                    <p className='text-[#0094ff] font-semibold'>{format.formatCurrency(dataTransaction?.amount,currency)}</p>
                </div>
                <div className='mt-5'>
                    <p className='text-[#959595]'>Nhà cung cấp</p>
                    <p className='text-[#0094ff] font-semibold'>{dataTransaction?.partnerID?.name}</p>
                </div>
                <div className='mt-5'>
                    <p className='text-[#959595]'>Tên sản phẩm</p>
                    <p className='text-[#0094ff] font-semibold'>{dataTransaction?.message}</p>
                </div>
                <div className='mt-5'>
                    <p className='text-[#959595]'>Mã đơn hàng</p>
                    <p className='text-black font-semibold'>{dataTransaction?.orderID}</p>
                </div>
                <div className='flex-col items-center w-full mt-10'>
                    <p className='mr-2 text-[16px] text-center w-full  mb-1'>Giao dịch hết hạn sau</p>
                    <div className='text-center border-[1px]  w-full p-2 mt-2 text-[#0094ff] border-[#0094ff] rounded-lg font-extrabold'><Countdown  date={  (new Date(dataTransaction?.createdAt).getTime()) + 10 * 60 * 1000 } 
                        renderer={({ minutes, seconds }) => (
                            <div>{minutes} phút {seconds} giây</div>
                        )}/>
                    </div>
                </div>
            </form>
    </>)
}