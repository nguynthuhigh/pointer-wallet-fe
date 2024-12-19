import React, { useState } from "react";
import Logo from "../../assets/svg/logo_blue.svg";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  Activity,
  Settings,
  TicketPercent,
  CodeXml,
  LogOut,
} from "lucide-react";
import Logo2 from "../../assets/images/logo.png";

const SideBar = ({ ...props }) => {
  const [selected, setSelected] = useState(props.state);

  const handleSelect = (name) => {
    setSelected(name);
  };

  const cookie = new Cookies();
  const navigate = useNavigate();

  const handleLogout = () => {
    cookie.remove("token_auth");
    navigate("/");
  };

  return (
    <div
      className={`px-3 border-r-2 h-screen overflow-hidden flex flex-col 
        lg:min-w-[230px] lg:w-[230px] min-w-[80px]`}
    >
      <div className="py-2 flex flex-col items-center justify-center w-full">
        <img
          alt="Logo"
          src={Logo}
          className="hidden lg:block object-cover"
        />
        <img
          alt="Logo2"
          src={Logo2}
          className="block lg:hidden h-[40px] object-cover"
        />
      </div>
      <div className="flex-1">
        <ItemSidebar
          icon={
            <LayoutGrid
              className={
                selected === "Dashboard" ? "stroke-white" : "stroke-gray-700"
              }
            />
          }
          name="Dashboard"
          isSelected={selected === "Dashboard"}
          onClick={() => handleSelect("Dashboard")}
          path="/dashboard"
        />
        <ItemSidebar
          icon={
            <Activity
              className={
                selected === "Transactions"
                  ? "stroke-white"
                  : "stroke-gray-700"
              }
            />
          }
          name="Transactions"
          isSelected={selected === "Transactions"}
          onClick={() => handleSelect("Transactions")}
          path="/transaction-history"
        />
        <ItemSidebar
          icon={
            <CodeXml
              className={
                selected === "Developer" ? "stroke-white" : "stroke-gray-700"
              }
            />
          }
          name="Developer"
          isSelected={selected === "Developer"}
          onClick={() => handleSelect("Developer")}
          path="/webhook"
        />
        <ItemSidebar
          icon={
            <TicketPercent
              className={
                selected === "Vouchers" ? "stroke-white" : "stroke-gray-700"
              }
            />
          }
          name="Vouchers"
          isSelected={selected === "Vouchers"}
          onClick={() => handleSelect("Vouchers")}
          path="/vouchers"
        />
        <ItemSidebar
          icon={
            <Settings
              className={
                selected === "Settings" ? "stroke-white" : "stroke-gray-700"
              }
            />
          }
          name="Settings"
          isSelected={selected === "Settings"}
          onClick={() => handleSelect("Settings")}
          path="/settings"
        />
      </div>
      <div className="mt-auto">
        <ItemSidebar
          icon={
            <LogOut
              className={
                selected === "Logout" ? "stroke-white" : "stroke-gray-700"
              }
            />
          }
          name="Logout"
          onClick={handleLogout}
          path="/"
        />
      </div>
    </div>
  );
};

const ItemSidebar = ({ icon, path, name, isSelected, onClick }) => {
  return (
    <Link to={path} onClick={onClick}>
      <div
        className={`flex my-2 lg:items-center justify-center rounded-[6px] hover:bg-gray-400 p-4 cursor-pointer 
          ${isSelected ? "bg-blue-500" : ""} 
          lg:justify-start justify-center`}
      >
        <div className="flex-shrink-0">{icon}</div>
        <h1
          className={`ml-2 text-gray-700 font-semibold text-md hidden lg:block ${
            isSelected ? "text-white" : ""
          }`}
        >
          {name}
        </h1>
      </div>
    </Link>
  );
};

export default SideBar;
