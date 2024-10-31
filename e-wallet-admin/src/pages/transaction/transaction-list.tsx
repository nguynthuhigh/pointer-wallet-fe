import { SideBar } from "../../components/sidebar/sidebar";
// import { IVoucher } from "@/interface/voucher";
// import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import { DateFrom } from "../../components/date/date-from";
import { DateTo } from "../../components/date/date-to";
import { Button } from "@mui/material";
import { SortBox } from "../../components/box/box-sort";
import { selectType, TypeBox } from "../../components/box/box-type";
import { selectStatus, StatusBox } from "../../components/box/box-status";
import { PaginateTransactions } from "@/components/paginate/transactions/paginateTransactions";

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
      <div className="flex">
        <div id="SideBar">
          <SideBar state={"Transactions"} />
        </div>
        <div className="flex-1 flex flex-col mr-[20px] ml-[230px] h-screen">
          <div id="Title" className="text-[36px] font-bold ">
            Transactions Management
          </div>
          <div
            id="TitleDetail"
            className="text-[17px] flex text-[#0094FF] pb-[10px]"
          >
            All transactions become quick, efficient, seamless!
          </div>
          <div className="flex items-center justify-between pb-[10px]">
            <div className="flex text-base py-[10px] gap-x-[10px] cursor-pointer">
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
                  handleType={handleType}
                  select={selectType}
                />
              </div>
              <div id="FromDate" className="relative z-30">
                <DateFrom
                  selectedFromDate={selectedFromDate}
                  setSelectedFromDate={setSelectedFromDate}
                />
              </div>
              <div id="ToDate" className="relative z-30">
                <DateTo
                  selectedToDate={selectedToDate}
                  setSelectedToDate={setSelectedToDate}
                />
              </div>

              <div id="BtnDeleteFilter">
                <Button
                  variant="contained"
                  onClick={clearFilters}
                  sx={{ height: "36", marginRight: "10px" }}
                >
                  Delete
                </Button>
              </div>
            </div>
            <div id="SearchSort" className="flex gap-x-[10px] h-[36px]">
              <SortBox
                sortOrder={sortOrder}
                handleSortOrder={handleSortOrder}
              />
            </div>
          </div>
          <div>
            <PaginateTransactions
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              selectedFromDate={selectedFromDate}
              selectedToDate={selectedToDate}
              filterStatus={status}
              filterType={type}
              sortOrder={sortOrder}
            />
          </div>
        </div>
      </div>
    </>
  );
};
