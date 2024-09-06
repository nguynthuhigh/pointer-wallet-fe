import React, { useState, ChangeEvent, FocusEvent } from "react";

import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import {
  formatCreditCardNumber,
  formatCVC,
} from "../../utils/format-credit-card";

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
    const value = e.target?.value;
    const formattedValue = formatFn ? formatFn(value) : value;
    setState(formattedValue);
  };

  const handleInputFocus = (
    e: FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFocus(e.target.name as Focused);
  };

  return (
    <div className="p-6 border bg-white m-4 w-full max-w-lg rounded-lg shadow-lg">
      <Cards
        number={number}
        expiry={`${expiryMonth}/${expiryYear}`}
        cvc={cvv}
        name={name}
        focused={focus}
      />
      <form className="mt-6 space-y-6">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">
            Số thẻ
          </label>
          <input
            type="text"
            name="number"
            className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
            value={formatCreditCardNumber(number)}
            onChange={(e) =>
              handleInputChange(e, setNumber, formatCreditCardNumber)
            }
            onFocus={handleInputFocus}
            maxLength={19}
            placeholder="1234 5678 9012 3456"
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">
            Tên chủ thẻ
          </label>
          <input
            type="text"
            name="name"
            className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
            value={name}
            onChange={(e) => handleInputChange(e, setName)}
            onFocus={handleInputFocus}
            placeholder="Luong Tu Nhan"
          />
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Tháng hết hạn
            </label>
            <select
              name="expiry"
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
              value={expiryMonth}
              onChange={(e) => handleInputChange(e, setExpiryMonth)}
              onFocus={handleInputFocus}
            >
              <option value="">Tháng</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Năm hết hạn
            </label>
            <select
              name="expiry"
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
              value={expiryYear}
              onChange={(e) => handleInputChange(e, setExpiryYear)}
              onFocus={handleInputFocus}
            >
              <option value="">Năm</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              CVV
            </label>
            <input
              type="text"
              name="cvc"
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
              value={formatCVC(cvv, number)}
              onChange={(e) =>
                handleInputChange(e, setCvv, (value) =>
                  formatCVC(value, number)
                )
              }
              onFocus={handleInputFocus}
              maxLength={4}
              placeholder="123"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
