import React from "react";
import { Link } from "react-router-dom";
import partnerAPI from "../../api/partner.api";
import ItemTransaction from "./item_transaction";
import { useQuery } from "@tanstack/react-query";
const RecentTransaction = () => {
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const response = await partnerAPI.getTransactions(1, 5);
      return response.data.data.transaction;
    },
    queryKey: "[recent_transactions]",
  });
  return (
    <div>
      <div className="flex my-6">
        <h1 className="font-semi-xl">Recent transactions</h1>
        <Link
          to="/"
          className="ml-auto text-sm font-semibold border p-2 rounded-lg"
        >
          View all
        </Link>
      </div>
      <table className="min-w-full bg-white rounded-lg font-semibold shadow-md overflow-hidden">
        <thead>
          <tr className=" text-gray-700 border-b-[1px] bg-gray-50 ">
            <td className="p-4 min-w-[140px]">Amount</td>
            <td className="p-4">Status</td>
            <td className="p-4">Descriptions</td>
            <td className="p-4">Order ID</td>
            <td className="p-4">Date</td>
            <td className="p-4">Type</td>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            data.map((item, key) => <ItemTransaction item={item} key={key} />)}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTransaction;
