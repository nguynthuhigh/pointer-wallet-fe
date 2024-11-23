import HeaderDashboard from "../components/header/header_dashboard";
import partnerAPI from "../api/partner.api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddWebHook from "../components/webhook/add-webhook";
import ViewWebHook from "../components/webhook/view-webhook";
import SideBar from "../components/dashboard/sidebar";
import { useQuery } from "@tanstack/react-query";
export default function WebHook() {
  const navigate = useNavigate();
  const [webhook, setWebhook] = useState(null);
 
  
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await partnerAPI.getProfilePartner();
      setWebhook(response.data.data.partner.webhook);
      if (response.data.data.partner?.name === undefined) {
        navigate("/update-profile");
      }
      return response.data.data;
    },
  });
  
  return (
    <div className="flex ">
      <div className="w-[30%]">
        <SideBar state="Developer"></SideBar>
      </div>
      <div className="w-full p-4 space-y-2">
        <HeaderDashboard title="Webhook"/>
        <p className="text-black text-lg font-medium ">Secret key: {data?.partner?.privateKey}</p>
        {isLoading ? (
          "..loading"
        ) : webhook ? (
          <ViewWebHook webhook={webhook}></ViewWebHook>
        ) : (
          <AddWebHook></AddWebHook>
        )}
        
      </div>
      <div className="w-[35%]"></div>
    </div>
  );
}
