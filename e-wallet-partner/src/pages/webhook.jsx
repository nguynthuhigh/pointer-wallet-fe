import HeaderDashboard from "../components/header/header_dashboard";
import AddWebHook from "../components/webhook/add-webhook";
import SideBar from "../components/dashboard/sidebar";
import { useDashboard } from "../hooks/useDashboard";
export default function WebHook() {
  const { data, isLoading } = useDashboard();

  return (
    <div className="flex ">
      <div className="w-[30%]">
        <SideBar state="Developer"></SideBar>
      </div>
      <div className="w-full p-4 space-y-2">
        <HeaderDashboard title="Webhook" />
        <p className="text-black text-lg font-medium ">
          Secret key: {data?.partner?.privateKey}
        </p>
        <p className="text-black text-lg font-medium ">
          Partner id: {data?.partner?._id}
        </p>

        {isLoading ? "..loading" : <AddWebHook></AddWebHook>}
      </div>
      <div className="w-[35%]"></div>
    </div>
  );
}
