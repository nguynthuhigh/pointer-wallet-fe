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
  return (
    <div className="flex">
      <SideBar state="Dashboard"></SideBar>
      <div className="w-full p-4">
        <div className="space-y-2">
          <h1 className="font-semi-4xl">
            Welcome ,
            {isLoading ? (
              ""
            ) : (
              <span className="text-color-default">{data?.name}</span>
            )}
          </h1>
          <h1 className="">
            Access & manage your account and transactions efficiently.
          </h1>
        </div>
        <div className="border rounded-xl p-6 shadow-sm flex">
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
          <div className="px-4 w-full space-y-10">
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
      <div className="w-[35%]">
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
