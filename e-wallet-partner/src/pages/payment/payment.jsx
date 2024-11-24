import Invoice from "../../components/payment-gateway/invoice";
import Countdown from "react-countdown";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageNotFound from "../../components/pages/page-not-found";
import { QRCode } from "react-qrcode-logo";
import logo from "../../assets/images/logo_vnd.png";
const PaymentGateway = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["get-token"],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.pointer.io.vn/api/payment/get-order/${token}`,
        {
          withCredentials: false,
        }
      );
      return response.data;
    },
  });
  if (isSuccess) {
    if (data.status === 202) {
      window.location.replace(data.url);
    }
  }
  if (isLoading) return "isLoading...";
  if (isError) return <PageNotFound />;
  return (
    <>
      <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-2 h-screen gap-x-[30px] p-4 md:mt-[40px]">
        <Invoice key={data._id} {...data} />

        <div
          id="QR-code"
          className="flex flex-col w-full items-center space-y-[20px]"
        >
          <div id="CountDownTime" className="text-4xl font-semibold">
            <Countdown
              date={new Date(data.createdAt).getTime() + 10 * 60 * 1000}
              renderer={({ minutes, seconds }) => (
                <div>
                  {minutes}:{seconds}
                </div>
              )}
            />
          </div>
          <p className="text-2xl">Quét mã QR để thanh toán</p>
          <div className="flex justify-center">
            <QRCode
              qrStyle="squares"
              size={300}
              logoImage={logo}
              logoWidth={100}
              value={`https://wallet.pointer.io.vn/payment?token=${token}`}
            />
          </div>
          <p className="text-lg text-center">
            Sử dụng App PressPay hoặc Camera để quét mã
          </p>
          <div className="flex justify-center space-x-1">
            <p>Bạn chưa có ứng dụng?</p>
            <u className="text-[#0094FF]">Tải ngay</u>
          </div>
          <a
            href={`https://wallet.pointer.io.vn/payment?token=${token}`}
            className="border-[1px] rounded-[4px] bg-[#0094FF] text-center text-white w-[320px] py-3 px-6 active:opacity-70 transition-opacity duration-300"
          >
            Pay With Pointer Wallet
          </a>
        </div>
      </div>
    </>
  );
};
export default PaymentGateway;
