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

interface SideBarProps {
  state: string;
}

const SideBar: React.FC<SideBarProps> = ({ state }) => {
  const location = useLocation(); 
  const [selected, setSelected] = useState<string>(() => {
    return localStorage.getItem("selectedTab") || state;
  });

  const [collapsed, setCollapsed] = useState<boolean>(() => {
    const savedState = localStorage.getItem("sidebar-collapsed");
    return savedState ? JSON.parse(savedState) : window.innerWidth < 1024;
  });

  useEffect(() => {
    const handleResize = () => {
      const shouldCollapse = window.innerWidth < 1024;
      setCollapsed(shouldCollapse);
      localStorage.setItem("sidebar-collapsed", JSON.stringify(shouldCollapse));
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      { name: "Nạp/Rút tiền", link: "/deposit-withdraw",icon: DepositWithdraw},
      { name: "Quản lý thẻ", link: "/credit-card", icon: CreditCard },
      { name: "Lịch sử giao dịch", link: "/transaction/history", icon: CreditCard },
      { name: "Cài đặt", link: "/setting", icon: Settings },
    ],
    []
  );
  return (
    <div
      className={`h-full bg-white shadow-lg transition-transform duration-300 ease-in-out w-[250px] mt-2 rounded-r-lg border pr-4 ${
        collapsed ? "translate-x-[-250px]" : "translate-x-0"
      } max-lg:fixed max-lg:left-0`}
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
