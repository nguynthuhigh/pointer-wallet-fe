import { useEffect, useState } from "preact/compat";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import CashInIcon from "../assets/svg/cashin.svg";
import VNDIcon from "../assets/png/vnd_icon.png";
import USDIcon from "../assets/png/usd_icon.png";
import ETHIcon from "../assets/png/eth_icon.png";
import ButtonFeature from "../components/home/button_feat";
import {
  ItemCurrency,
  ItemCurrencyLoading,
} from "../components/home/item_currency";
import Settings_Icon from "../assets/svg/settings.svg";
import HistoryIcon from "../assets/svg/history_trans.svg";
import { getProfileAPI } from "../services/api/user.api";
import { formatCurrency } from "../utils/format_currency";

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
        const token = cookies.get("token_auth");
        if (!token) {
          navigate("/auth/login");
          return;
        }

        const response = await getProfileAPI(token);
        if (response.status === 200) {
          setWalletData(response.data.data.walletData);
          setUserData(response.data.data.userData);
        } else {
          navigate("/auth/login");
        }
      } catch (error) {
        console.error(error);
        navigate("/auth/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [cookies, navigate]);

  return (
    <div className="p-4">
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

      <div className="h-[1px] w-full bg-button-hover my-5"></div>

      <h1 className="my-5 text-2xl font-semibold">Tài sản</h1>
      {isLoading ? (
        <>
          <ItemCurrencyLoading />
          <ItemCurrencyLoading />
          <ItemCurrencyLoading />
        </>
      ) : (
        <>
          <ItemCurrency
            image={VNDIcon}
            item={walletData?.currencies[0]}
            symbol="VND"
            name="Vietnamese Dong"
          />
          <ItemCurrency
            image={USDIcon}
            item={walletData?.currencies[1]}
            symbol="USD"
            name="US Dollar"
          />
          <ItemCurrency
            image={ETHIcon}
            item={walletData?.currencies[2]}
            symbol="ETH"
            name="Ethereum"
          />
        </>
      )}
    </div>
  );
};

export default Home;
