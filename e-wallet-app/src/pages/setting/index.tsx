import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Profile from "../../components/setting/profile_tab";
import Security from "../../components/setting/security_tab";
import { useQuery } from "@tanstack/react-query";
import { getProfileAPI } from "../../services/api/auth.api";
import Loading from "../loading";
export default function Setting() {
  const { data, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await getProfileAPI();
      return response.data.data.userData;
    },
  });
  return (
    <div class={`container-center`}>
      {isLoading ? (
        <Loading />
      ) : (
        <Tabs
          selectedTabClassName={`bg-blue-500 text-white rounded-lg focus:outline-none `}
        >
          <TabList className={`flex font-semibold`}>
            <Tab className={`p-2 cursor-pointer`}>Thông tin</Tab>
            <Tab className={`p-2 cursor-pointer`}>Bảo mật</Tab>
          </TabList>
          <TabPanel>
            <Profile data={data} />
          </TabPanel>
          <TabPanel>
            <Security />
          </TabPanel>
        </Tabs>
      )}
    </div>
  );
}
