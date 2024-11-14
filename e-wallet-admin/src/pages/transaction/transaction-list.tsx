// import { IVoucher } from "@/interface/voucher";
// import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import { DateFrom } from "../../components/date/date-from";
import { DateTo } from "../../components/date/date-to";
import { SortBox } from "../../components/box/box-sort";
import { TypeBox } from "../../components/box/box-type";
import { StatusBox } from "../../components/box/box-status";
import { PaginateTransactions } from "@/components/paginate/transactions/paginateTransactions";
import { HeaderComponent } from "@/components/header/header";
import { selectStatus } from "@/interfaces/status-box-item";
import { selectType } from "@/interfaces/type-box-items";
import { motion } from 'framer-motion'
export const TransactionsList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedFromDate, setSelectedFromDate] = useState<Date | null>(null);
  const [selectedToDate, setSelectedToDate] = useState<Date | null>(null);
  // const [search, setSearch] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [status, setStatus] = useState<
    "all" | "completed" | "fail" | "pending" | "refund"
  >("all");
  const [type, setType] = useState<
    "all" | "transfer" | "deposit" | "payment" | "withdraw"
  >("all");

  //Handle
  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearch(e.target.value);
  // };
  const handleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };
  const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(
      e.target.value as "all" | "transfer" | "deposit" | "payment" | "withdraw"
    );
  };
  const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(
      e.target.value as "all" | "completed" | "fail" | "pending" | "refund"
    );
  };

  const clearFilters = () => {
    setSelectedFromDate(null);
    setSelectedToDate(null);
  };
  return (
    <>
      <div className="flex-1 mx-auto h-screen overflow-auto">
        <HeaderComponent title="Transactions Management" />
        <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-gray-800 backdrop-opacity-70 backdrop-blur-md px-5 py-1 rounded-[6px]"
          >
            <div className="flex items-center justify-between pb-[10px]">
              <div className="flex items-end text-base py-[10px] gap-x-[20px] cursor-pointer w-full">
                <div id="Status">
                  <StatusBox
                    status={status}
                    select={selectStatus}
                    handleStatus={handleStatus}
                  />
                </div>
                <div id="Type">
                  <TypeBox
                    type={type}
                    handleType={() => handleType}
                    select={selectType}
                  />
                </div>
                <div id="FromDate" className="relative z-50">
                  <DateFrom
                    selectedFromDate={selectedFromDate}
                    setSelectedFromDate={setSelectedFromDate}
                  />
                </div>
                <div id="ToDate">
                  <DateTo
                    selectedToDate={selectedToDate}
                    setSelectedToDate={setSelectedToDate}
                  />
                </div>
                <div id="BtnDeleteFilter">
                  <button
                    className="bg-blue-500 h-[42px] w-[100px] rounded-[6px] font-semibold uppercase text-center"
                    onClick={clearFilters}>
                    Delete
                  </button>
                </div>
                <div id="SearchSort" className="flex gap-x-[10px] h-[42px] ml-auto">
                  <SortBox
                    sortOrder={sortOrder}
                    handleSortOrder={handleSortOrder}
                  />
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="bg-gray-800 backdrop-opacity-70 backdrop-blur-md px-5 py-4 rounded-[6px]"
          >
            <PaginateTransactions
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              selectedFromDate={selectedFromDate}
              selectedToDate={selectedToDate}
              filterStatus={status}
              filterType={type}
              sortOrder={sortOrder}
            />
          </motion.div>
        </main>
      </div>
    </>
  );
};
