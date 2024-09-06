import React, { useState, ChangeEvent, FocusEvent } from "react";
import Cards from "react-credit-cards-2";
import Select from "react-select";

import "react-credit-cards-2/dist/es/styles-compiled.css";
import {
  formatCreditCardNumber,
  formatCVC,
} from "../../utils/format-credit-card";
import Payment from "payment";

type Focused = "number" | "name" | "expiry" | "cvc" | undefined;

export default function AddCreditCard() {
  const [number, setNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [expiryMonth, setExpiryMonth] = useState<string>("");
  const [expiryYear, setExpiryYear] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [focus, setFocus] = useState<Focused>(undefined);

  const months = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const years = Array.from({ length: 10 }, (_, i) =>
    (new Date().getFullYear() + i).toString()
  );

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    setState: React.Dispatch<React.SetStateAction<string>>,
    formatFn?: (value: string) => string
  ) => {
    const value = e.target?.value || "";
    const formattedValue = formatFn ? formatFn(value) : value;
    setState(formattedValue);
  };

  const handleInputFocus = (
    e: FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFocus(e.target.name as Focused);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cardData = {
      number,
      name,
      expiryMonth,
      expiryYear,
      cvv,
      issuer: Payment.fns.cardType(number),
    };

    console.log("Card Data:", cardData);
  };

  const cardType = Payment.fns.cardType(number);
  const monthOptions = months.map((month) => ({ value: month, label: month }));
  const yearOptions = years.map((year) => ({ value: year, label: year }));

  return (
    <div className="p-6 border bg-white m-4 w-full max-w-lg rounded-lg shadow-lg">
      <Cards
        number={number}
        expiry={`${expiryMonth}/${expiryYear}`}
        cvc={cvv}
        name={name}
        focused={focus}
      />
      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-300">
            Số thẻ
          </label>
          <input
            type="text"
            name="number"
            className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:outline-blue-default"
            value={number}
            onChange={(e) =>
              handleInputChange(e, setNumber, formatCreditCardNumber)
            }
            onFocus={handleInputFocus}
            maxLength={19}
            placeholder="1234 5678 9012 3456"
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700">
            Tên chủ thẻ
          </label>
          <input
            type="text"
            name="name"
            className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:outline-blue-default"
            value={name}
            onChange={(e) => handleInputChange(e, setName)}
            onFocus={handleInputFocus}
            placeholder="Luong Tu Nhan"
          />
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="w-full sm:w-1/2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tháng hết hạn
            </label>
            <Select
              options={monthOptions}
              placeholder="Chọn tháng"
              className="react-select-container"
              classNamePrefix="react-select"
              onChange={(option) => setExpiryMonth(option?.value || "")}
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Năm hết hạn
            </label>
            <Select
              options={yearOptions}
              placeholder="Chọn năm"
              className="react-select-container"
              classNamePrefix="react-select"
              onChange={(option) => setExpiryYear(option?.value || "")}
            />
          </div>
        </div>

        <div className="w-1/2">
          <label className="block text-sm font-semibold text-gray-700">
            CVV
          </label>
          <input
            type="text"
            name="cvc"
            className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:outline-blue-default"
            value={cvv}
            onChange={(e) =>
              handleInputChange(e, setCvv, (value) => formatCVC(value, number))
            }
            onFocus={handleInputFocus}
            maxLength={cardType === "amex" ? 4 : 3}
            placeholder="123"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 bg-blue-600 text-white rounded-md"
        >
          Thêm thẻ
        </button>
      </form>
    </div>
  );
}
