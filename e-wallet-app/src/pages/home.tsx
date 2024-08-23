import { useEffect, useState } from "preact/compat";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import CashInIcon from "../assets/svg/cashin.svg";

import ButtonFeature from "../components/home/button_feat";
import Settings_Icon from "../assets/svg/settings.svg";
import HistoryIcon from "../assets/svg/history_trans.svg";
import { getProfileAPI } from "../services/api/user.api";
import { formatCurrency } from "../utils/format_currency";
import SideBar from "../components/sidebar/sidebar";
import RecentTransaction from "../components/home/recent_transaction";
import Assets from "../components/home/assets";
import Header from "../components/header/header";

const Home = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  type TypeUser = {
    _id: string;
    email: string;
    full_name: string;
    avatar: string;
  };

  type TypeCurrency = {
    balance: number;
  };

  type TypeWallet = {
    currencies: TypeCurrency[];
  };

  const [userData, setUserData] = useState<TypeUser | null>(null);
  const [walletData, setWalletData] = useState<TypeWallet | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfileAPI();
        if (response.status === 200) {
          setWalletData(response.data.data.walletData);
          setUserData(response.data.data.userData);
          setIsLoading(false);
        } 
      } catch (error) {
        setIsLoading(false)
      } 
    };

    fetchProfile();
  }, []);

  return (<>
       <Header></Header>
    <div class={`flex  bg-gray-50 h-[100vh]`}>
      
      <SideBar state='Trang chủ'></SideBar>
     <div class={`flex max-sm:flex-wrap w-full h-fit`}>
      <div className="w-full bg-white m-2 rounded-lg border shadow-lg p-4">
          <div class={``}>
            <div className="flex">
              {isLoading ? (
                <div className="rounded-full w-[50px] h-[50px] bg-gray-200 animate-pulse"></div>
              ) : (
                <img
                  src={userData?.avatar}
                  className="rounded-full w-[50px] h-[50px] object-cover"
                />
              )}
              <div className="mx-3 h-full my-auto">
                {isLoading ? (
                  <>
                    <h1 className="bg-gray-200 w-20 rounded-full">&nbsp;</h1>
                    <div className="w-[200px] h-4 bg-gray-200 rounded-full animate-pulse mt-2"></div>
                  </>
                ) : (
                  <>
                    <h1 className="text-gray-500 text-sm">Chào buổi sáng</h1>
                    <h1 className="font-semibold text-lg">{userData?.full_name}</h1>
                  </>
                )}
              </div>
              <img
                className="ml-auto hover:rotate-90 w-6 h-6 cursor-pointer"
                src={Settings_Icon}
                alt="Settings"
              />
            </div>
            <div>
              {isLoading ? (
                <div className="w-[60%] h-8 my-6 bg-gray-200 rounded-full animate-pulse"></div>
              ) : (
                <h1 className="font-semibold text-4xl my-6">
                  {formatCurrency(walletData?.currencies[0].balance, "VND")}
                </h1>
              )}
            </div>
            <div className="grid grid-flow-row grid-cols-5 gap-1">
              <ButtonFeature link="/transfer" image={CashInIcon} title="Gửi" />
              <ButtonFeature link="/receive-page" image={HistoryIcon} title="Nhận" />
              <ButtonFeature link="/scan-qrcode" image={CashInIcon} title="Quét mã" />
              <ButtonFeature
                link="/deposit-withdraw"
                image={CashInIcon}
                title="Nạp/Rút"
              />
              <ButtonFeature
                link="/transaction/history"
                image={HistoryIcon}
                title="Lịch sử"
              />
            </div>
            <div>
            </div>
          </div>
           <Assets isLoading={isLoading} walletData={walletData}></Assets>
        </div>
        <div class={`bg-white h-fit rounded-lg m-2 md:max-w-sm sm:w-full w-full border shadow-lg`}>
          <h1 class={`font-semibold text-sm m-4`}>Giao dịch gần đây</h1>
          <RecentTransaction></RecentTransaction>
        </div>
     </div>
    </div></>
  );
};

export default Home;
