import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import SideBarPart from "./sidebar_part";
import Icon from "../../assets/svg/send_money.svg";
import Home from "../../assets/svg/home.svg";
import ReceiveMoney from "../../assets/svg/receive.svg";
import Payment from "../../assets/svg/payment.svg";
import DepositWithdraw from "../../assets/svg/depo-with.svg";
import CreditCard from "../../assets/svg/credit-card.svg";
import Settings from "../../assets/svg/set.svg";
import History from "../../assets/svg/transaction-history.svg";
import ConnectAppIcon from '../../assets/svg/connect_app.svg';
import ConnectAppListIcon from '../../assets/svg/connect-app-list.svg'
interface SideBarProps {
  state: string;
}

const SideBar: React.FC<SideBarProps> = ({ state }) => {
  const location = useLocation();
  const [selected, setSelected] = useState<string>(() => {
    return localStorage.getItem("selectedTab") || state;
  });

  useEffect(() => {
    const currentPath = location.pathname;
    const matchingTab = sidebarItems.find((item) => item.link === currentPath);
    if (matchingTab) {
      setSelected(matchingTab.name);
      localStorage.setItem("selectedTab", matchingTab.name);
    }
  }, [location]);

  const handleSelect = (tabName: string) => {
    setSelected(tabName);
    localStorage.setItem("selectedTab", tabName);
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const origin = window.location.origin;
      if (event.target instanceof Window) {
        const nextUrl = new URL(event.target.location.href);
        if (nextUrl.origin !== origin) {
          localStorage.removeItem("selectedTab");
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const sidebarItems = useMemo(
    () => [
      { name: "Trang chủ", link: "/", icon: Home },
      { name: "Chuyển tiền", link: "/transfer", icon: Icon },
      { name: "Nhận tiền", link: "/receive-page", icon: ReceiveMoney },
      { name: "Thanh toán", link: "/option-payment", icon: Payment },
      {
        name: "Nạp/Rút tiền",
        link: "/deposit-withdraw",
        icon: DepositWithdraw,
      },
      { name: "Quản lý thẻ", link: "/credit-card", icon: CreditCard },
      {
        name: "Lịch sử giao dịch",
        link: "/transaction/history",
        icon: History,
      },
      {name: "App đã liên kết", link: "/connect-app-list",icon: ConnectAppIcon},
      { name: "Cài đặt", link: "/setting", icon: Settings },
      
    ],
    []
  );
  return (
    <div
      className={`h-full bg-white shadow-lg transition-all duration-300 ease-in-out  w-[250px] mt-2 rounded-r-lg border pr-4 hidden md:block `}
    >
      {sidebarItems.map((item) => (
        <SideBarPart
          key={item.name}
          link={item.link}
          selected={selected}
          handleSelect={() => handleSelect(item.name)}
          name={item.name}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default SideBar;
