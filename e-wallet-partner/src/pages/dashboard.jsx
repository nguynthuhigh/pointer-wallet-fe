import React from "react";
import CountUp from "react-countup";
import {
  ChartDoughnut,
  ChartDoughnutLoading,
} from "../components/dashboard/chart";
import SideBar from "../components/dashboard/sidebar";
import { AssetBarLoading, AssetBar } from "../components/dashboard/assetsbar";
import RecentTransaction from "../components/dashboard/recent_transaction";
import partnerAPI from "../api/partner.api";
import { useQuery } from "@tanstack/react-query";
const Dashboard = () => {
  const { isLoading, data } = useQuery({
    queryFn: async () => {
      const response = await partnerAPI.getProfilePartner();
      return response.data.data;
    },
    queryKey: ["dashboard"],
    refetchOnWindowFocus: false,
    gcTime: 20000,
  });
  console.log(data)
  return (
    <div className="flex">
      <SideBar state="Dashboard"></SideBar>
      <div className="w-full px-6 space-y-4">
        <div className="space-y-2">
          <h1 className="font-semi-4xl mt-2">
            Welcome <nbsp></nbsp>
            {isLoading ? (
              ""
            ) : (
              <span className="text-color-default">{data?.partner.name}</span>
            )}
          </h1>
          <h1 className='font-medium text-gray-700'>
            Access & manage your account and transactions efficiently.
          </h1>
        </div>
        <div className="border border-gray-300 rounded-xl p-6 shadow-sm flex cursor-pointer">
          <div>
            {isLoading ? (
              <ChartDoughnutLoading />
            ) : (
              <ChartDoughnut
                vnd={data.wallet.currencies[0].balance}
                usd={data.wallet.currencies[1].balance * 25000}
                eth={data.wallet.currencies[2].balance * 2500}
              ></ChartDoughnut>
            )}
          </div>
          <div className="px-4 w-full space-y-10 ">
            <div className="flex font-semi-lg">
              <h1>Statistic</h1>
              <h1 className="ml-auto">View more</h1>
            </div>
            <div className="h-fit mt-auto">
              <h1 className="text-gray-400">VND Current Balance</h1>
              <h1 className="font-bold font-inter text-4xl ">
                {isLoading ? (
                  ""
                ) : (
                  <CountUp
                    duration={2.5}
                    prefix={"₫"}
                    separator={","}
                    start={0}
                    end={data.wallet.currencies[0].balance}
                  ></CountUp>
                )}
              </h1>
            </div>
          </div>
        </div>
        <RecentTransaction></RecentTransaction>
      </div>
      <div className="hidden lg:block lg:w-[35%] ">
        {isLoading ? (
          <AssetBarLoading></AssetBarLoading>
        ) : (
          <AssetBar partner={data.partner} wallet={data.wallet}></AssetBar>
        )}
      </div>
    </div>
  );
};
export default Dashboard;