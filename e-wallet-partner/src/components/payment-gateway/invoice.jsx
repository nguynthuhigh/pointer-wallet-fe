import React from "react";
import { formatCurrency } from "../../utils/format";
const Invoice = ({ ...props }) => {
  const data = props.data;
  return (
    <div>
      <div id="Payment" className="md:pt-[80px]">
        <div id="Pay" className="space-y-3">
          <div id="Logo" className="flex items-center space-x-2">
            <img
              className="size-[60px]"
              src={data1.partnerID.image}
              alt="logo"
            ></img>
            <h1 id="Name" className="text-xl font-semibold">
              {data1.partnerID.name}
            </h1>
          </div>
          <div>
            <div id="Title" className="text-gray-400 font-semibold text-lg">
              {data1.title}
            </div>
            <p className="text-2xl">
              {formatCurrency(data1.amount, data1.currency.symbol)}
            </p>
          </div>
        </div>
        <div className="space-y-[20px] mt-2 ">
          <div className="space-y-[20px] max-h-[450px] overflow-auto scrollbar-hide ">
            {data1.orders.map((items) => {
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
                    <p className="text-sm text-gray-400 font-semibold">
                      Quantity:{" "}
                      <span className="text-black">{items.quantity}</span>{" "}
                    </p>
                  </div>
                  <div
                    id="price"
                    className=" text-center text-lg text-black font-semibold ml-auto"
                  >
                    {formatCurrency(items.price, data1.currency.symbol)}
                  </div>
                </div>
              );
            })}
            <div
              id="total"
              className="flex justify-between absolute w-full bottom-0 left-0  bg-gray-50"
            >
              <div id="name" className="text-lg font-semibold">
                Total
              </div>
              <div id="price" className="text-xl font-semibold ">
                {formatCurrency(data1.amount, data1.currency.symbol)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
