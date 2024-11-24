import { useEffect, useState, useMemo } from "preact/compat";
import { Link } from "react-router-dom";
import CashInIcon from "../assets/svg/cashin.svg";
import { useDispatch, useSelector } from "react-redux";
import ButtonFeature from "../components/home/button_feat";
import Settings_Icon from "../assets/svg/settings.svg";
import HistoryIcon from "../assets/svg/history_trans.svg";
import { formatCurrency } from "../utils/format_currency";
import RecentTransaction from "../components/home/recent_transaction";
import Assets from "../components/home/assets";
import { getProfile } from "../redux/user/userThunk";
import { AppDispatch, RootState } from "../redux/store";

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state.user.userState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getProfile());
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  const { userData, walletData } = profile || {
    userData: undefined,
    walletData: undefined,
  };

  const userAvatar = useMemo(
    () =>
      isLoading
        ? "rounded-full w-[50px] h-[50px] bg-gray-200 animate-pulse"
        : "rounded-full w-[50px] h-[50px] object-cover",
    [isLoading]
  );

  const renderUserGreeting = () => {
    if (isLoading) {
      return (
        <>
          <h1 className="bg-gray-200 w-20 rounded-full">&nbsp;</h1>
          <div className="w-[200px] h-4 bg-gray-200 rounded-full animate-pulse mt-2"></div>
        </>
      );
    }

    return (
      <>
        <h1 className="text-gray-500 text-sm">Chào buổi sáng</h1>
        <h1 className="font-semibold text-lg">
          {userData?.full_name || userData?.email || "Người dùng"}
        </h1>
      </>
    );
  };

  const buttonFeatures = [
    { link: "/transfer", image: CashInIcon, title: "Gửi" },
    { link: "/receive-page", image: HistoryIcon, title: "Nhận" },
    { link: "/scan-qrcode", image: CashInIcon, title: "Quét mã" },
    { link: "/deposit-withdraw", image: CashInIcon, title: "Nạp/Rút" },
    { link: "/transaction/history", image: HistoryIcon, title: "Lịch sử" },
  ];

  return (
    <>
      <div className="flex max-sm:flex-wrap w-full h-fit">
        <div className="w-full bg-white m-2 rounded-lg border shadow-lg p-4">
          <div>
            <div className="flex">
              <div className={userAvatar}>
                {!isLoading && userData?.avatar && (
                  <img
                    src={userData.avatar}
                    className="rounded-full w-[50px] h-[50px] object-cover"
                  />
                )}
              </div>
              <div className="mx-3 h-full my-auto">{renderUserGreeting()}</div>
              <Link to={"/setting"} className={"ml-auto block"}>
                <img
                  className=" hover:rotate-90 w-6 h-6 cursor-pointer"
                  src={Settings_Icon}
                  alt="Settings"
                />
              </Link>
            </div>
            <div>
              {isLoading ? (
                <div className="w-[60%] h-8 my-6 bg-gray-200 rounded-full animate-pulse"></div>
              ) : (
                <h1 className="font-semibold text-4xl my-6">
                  {formatCurrency(
                    walletData?.currencies?.[0]?.balance || 0,
                    "VND"
                  )}
                </h1>
              )}
            </div>
            <div className="grid grid-flow-row grid-cols-5 gap-1">
              {buttonFeatures.map((feature) => (
                <ButtonFeature
                  key={feature.link}
                  link={feature.link}
                  image={feature.image}
                  title={feature.title}
                />
              ))}
            </div>
          </div>
          <Assets isLoading={isLoading} walletData={walletData} />
        </div>
        <div className="bg-white h-fit rounded-lg m-2 md:max-w-sm sm:w-full w-full border shadow-lg">
          <h1 className="font-semibold text-sm m-4">Giao dịch gần đây</h1>
          <RecentTransaction />
        </div>
      </div>
    </>
  );
};

export default Home;
