import HeaderDashboard from "../components/header/header_dashboard";
import AddWebHook from "../components/webhook/add-webhook";
import SideBar from "../components/dashboard/sidebar";
import { useDashboard } from "../hooks/useDashboard";
import CopyClipBoard from "../components/dashboard_old/components/clip_board";
export default function WebHook() {
  const { data, isLoading } = useDashboard();
  
  return (
    <div className="flex">
      <SideBar state="Developer"></SideBar>
      <div className="w-full lg:w-[1000px] px-6 space-y-4">
        <HeaderDashboard title="Webhook" />
        <p className="text-black text-md font-medium grid grid-cols-[80px_1fr] items-center">
          Secret key: <CopyClipBoard text={data?.partner?.privateKey}/>
        </p>
        <p className="text-black text-md font-medium grid grid-cols-[80px_1fr] items-center ">
          Partner id: <CopyClipBoard text={data?.partner?._id}/>
        </p>
        {isLoading ? "...loading" : <AddWebHook></AddWebHook>}
      </div>
    </div>
  );
}