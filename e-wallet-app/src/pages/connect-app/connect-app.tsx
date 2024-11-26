import HeaderDefault from "../../components/header/header_default";
import AvatarDefault from "../../assets/png/default_avatar.png";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getPartnerWallet } from "../../services/api/connect-app.api";
import DrawerBottom from "./drawer_security";
import { useState } from "react";
import Loading from "../loading";
export const ConnectApp: React.FC = () => {
  const [isOpen, SetIsOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const partnerId = searchParams.get("partnerId");
  const userId = searchParams.get("userId");
  const returnUrl = searchParams.get("returnUrl");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-partner-wallet"],
    queryFn: () =>
      getPartnerWallet({
        partnerId: partnerId as string,
      }),
  });
  console.log(data);
  console.log(returnUrl);
  if (isLoading) return <Loading />;
  if (isError)
    return <p className={"w-full text-center"}>Fetching data error</p>;

  const handleOpen = () => {
    SetIsOpen(true);
  };
  const handleClose = () => {
    SetIsOpen(false);
  };
  return (
    <>
      <div class={"container-center"}>
        <HeaderDefault title="Kết nối ví Pointer Wallet" />
        <div className={"space-y-[20px]"}>
          <p className={"text-xl font-bold"}>Yêu cầu từ app </p>
          <div className="grid grid-cols-[90px_1fr]">
            <img
              src={data.image || AvatarDefault}
              className="size-[60px] rounded-full"
            />
            <div>
              <p className={"font-bold"}>{data.name}</p>
              <p className={"text-gray-500"}>{data.email}</p>
            </div>
          </div>
          <div className={"w-full"}>
            <button
              onClick={handleOpen}
              className={
                "bg-blue-500 w-full px-5 py-2 font-bold rounded-[6px] text-white text-center hover:bg-blue-700 active:opacity-70"
              }
            >
              Kết nối
            </button>
          </div>
        </div>
      </div>
      <DrawerBottom
        onClose={handleClose}
        state={isOpen}
        data={{
          partnerId: partnerId || "",
          userId: userId || "",
          security_code: "",
          returnUrl: returnUrl || "",
        }}
      />
    </>
  );
};
