import QRCode from "react-qr-code";
import { formatCurrency, formatTime, formatTimeYYMMDD } from "../../utils/format";
import Invoice from "../../components/payment-gateway/invoice";
import Countdown from 'react-countdown';
import { CountDownTime } from "../../components/countdown-time/countdown_time";
import  axios  from 'axios'
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';

const PaymentGateway = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get('token')
    console.log(token)

    const {data,isLoading} = useQuery({
        queryKey: ['get-token'],
        queryFn: async () => {
          const response = await axios.get(`https://api.pointer.io.vn/api/payment/get-order/${token}`);
          return response.data
        }
    })
    if (isLoading) return 'isLoading...'
    console.log(data)
  return (
    <>
      <div className="max-w-[1000px] mx-auto grid grid-cols-1  lg:grid-cols-2 h-screen gap-x-[30px]">
        <Invoice key={data._id} {...data} />
        <div
          id="QR-code"
          className="flex flex-col w-full items-center justify-center space-y-[20px]"
        >
          <p className="text-2xl">Quét mã QR để thanh toán</p>
          <div className="flex justify-center">
            <QRCode value="MaGiaoDich" />
          </div>
          <p className="text-lg text-center">
            Sử dụng App PressPay hoặc Camera để quét mã
          </p>
          <div className="flex justify-center space-x-1">
            <p>Bạn chưa có ứng dụng?</p>
            <u className="text-[#0094FF]">Tải ngay</u>
          </div>
          <button className="border-[1px] rounded-[4px] bg-[#0094FF] text-white w-[320px] py-3 px-6 active:opacity-70 transition-opacity duration-300">
            Pay With Pointer Wallet
          </button>
          <div id="CountDownTime">
            <CountDownTime startTime={data.currency.createdAt}/>
          </div>
        </div>
      </div>
    </>

  );
};
export default PaymentGateway;
