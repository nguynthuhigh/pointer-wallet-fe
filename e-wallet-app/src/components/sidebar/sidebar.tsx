import { useState, useEffect, useMemo } from "react";
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
  const [selected, setSelected] = useState<string>(state);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth < 1024 ? setCollapsed(true) : setCollapsed(false);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSelect = (state: string) => {
    setSelected(state);
  };

  const sidebarItems = useMemo(
    () => [
      { name: "Trang chủ", link: "/", icon: Home },
      { name: "Chuyển tiền", link: "/transfer", icon: Icon },
      { name: "Nhận tiền", link: "/receive-page", icon: ReceiveMoney },
      { name: "Thanh toán", link: "/payment", icon: Payment },
      {
        name: "Nạp/Rút tiền",
        link: "/deposit-withdraw",
        icon: DepositWithdraw,
      },
      { name: "Quản lý thẻ", link: "/credit-card", icon: CreditCard },
      { name: "Cài đặt", link: "/setting", icon: Settings },
    ],
    []
  );
  return (
    <div
      className={`h-full bg-white shadow-lg transition-transform duration-300 ease-in-out w-[250px] mt-2 rounded-r-lg border pr-4 ${
        collapsed ? "translate-x-[-250px]" : "translate-x-0"
      } max-lg:fixed max-lg:left-0 `}
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
