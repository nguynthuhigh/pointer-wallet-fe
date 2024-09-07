import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Profile from '../../components/setting/profile_tab';
import Security from '../../components/setting/security_tab';
import { useQuery } from '@tanstack/react-query';
export default function Setting() {
  const {data, isLoading,isError} = useQuery({
    queryKey:['userProfile'],
    queryFn:()=>{}
  })
  return <div class={`container-center`}>
    {isLoading ? '...loading' : 
       <Tabs selectedTabClassName={`bg-blue-500 text-white rounded-lg focus:outline-none `}>
            <TabList className={`flex font-semibold`}>
              <Tab  className={`p-2 cursor-pointer`}>Thông tin</Tab>
              <Tab className={`p-2 cursor-pointer`}>Bảo mật</Tab>
            </TabList>
            <TabPanel>
                <Profile />
            </TabPanel>
            <TabPanel>
                <Security/>
            </TabPanel>
        </Tabs>
        }
  </div>;
}
