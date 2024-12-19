import React from "react";
import { formatCurrency } from "../../utils/format";
import PointerWallet from '../../assets/images/logo.png'
import isValidURL from "../../utils/catch-img";
const Invoice = ({ ...data }) => {
  return (
    <>
      <div>
        <div id="Payment" className="">
          <div id="Pay" className="space-y-3">
            <div id="Logo" className="flex items-center space-x-4">
              <img
                className="size-[60px] rounded-md"
                src={
                  data?.partnerID?.image && isValidURL(data.partnerID.img) ? data.partnerID.img : PointerWallet
                }
                alt="logo"
              ></img>
              <h1 id="Name" className="text-xl font-semibold">
                {data.partnerID.name}
              </h1>
            </div>
            <div>
              <div id="Title" className="text-gray-500 font-semibold text-xl">
                {data.title}
              </div>
              <p className="text-4xl my-5 font-semibold">
                {formatCurrency(data.amount, data.currency.symbol)}
              </p>
            </div>
          </div>
          <div className="space-y-[20px] mt-2 relative ">
            <div className="space-y-[20px] max-h-[500px] overflow-auto pb-10 scrollbar-hide ">
              {data?.orders?.map((items) => {
                return (
                  <div className="flex border-black pb-3">
                    <img
                      className="size-[40px] rounded-sm"
                      src={items.image}
                      alt=""
                    />
                    <div className="ml-4">
                      <p id="Name" className="font-semibold">
                        {items.name}
                      </p>
                      <p className="text-sm text-gray-500 font-semibold">
                        Quantity :{" "}
                        <span>{items.quantity}</span>{" "}
                      </p>
                    </div>
                    <div
                      id="price"
                      className=" text-center text-xl font-semibold ml-auto"
                    >
                      {formatCurrency(items.price, data.currency.symbol)}
                    </div>
                  </div>
                );
              })}
              <div
                id="total"
                className="flex justify-between absolute w-full bottom-0 left-0 border-t border-gray-300 "
              >
                <div id="name" className="text-2xl font-semibold">
                  Total
                </div>
                <div id="price" className="text-2xl font-semibold ">
                  {formatCurrency(data.amount, data.currency.symbol)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
