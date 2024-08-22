import React, { useState, ChangeEvent, FocusEvent, FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import Cards, { Focused } from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import HeaderDefault from "../../components/header/header_default";

import {
  formatCreditCardNumber,
  formatExpirationDate,
  formatCVC,
  formatFormData,
} from "../../utils/format-credit-card";

interface CardState {
  name: string;
  number: string;
  cvv: string;
  expiryMonth: string;
  expiryYear: string;
}

export default function AddCreditCard() {
  const [card, setCard] = useState<CardState>({
    name: "",
    number: "",
    cvv: "",
    expiryMonth: "",
    expiryYear: "",
  });
  const [focused, setFocused] = useState<Focused | undefined>("");

  const focusMapping: { [key: string]: Focused } = {
    number: "number",
    name: "name",
    expiryMonth: "expiry",
    expiryYear: "expiry",
    cvv: "cvc",
  };

  const handleInputFocus = (e: FocusEvent<HTMLInputElement>) => {
    const focusValue = focusMapping[e.target.name];
    setFocused(focusValue);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let formattedValue = value;
    if (name === "number") {
      formattedValue = formatCreditCardNumber(value);
    } else if (name === "expiryMonth" || name === "expiryYear") {
      formattedValue = formatExpirationDate(value);
    } else if (name === "cvv") {
      formattedValue = formatCVC(value, card.number);
    }

    setCard((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Thẻ tín dụng đã được thêm thành công!");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <HeaderDefault title="Thêm thẻ" />
      <div className="mt-6">
        <Cards
          name={card.name}
          number={card.number}
          cvc={card.cvv}
          expiry={`${card.expiryMonth}/${card.expiryYear}`}
          focused={focused}
        />

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="form-group mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Card Number
            </label>
            <input
              type="tel"
              name="number"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="1234 1234 1234 1234"
              value={card.number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              name="name"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="John Doe"
              value={card.name}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              required
            />
          </div>

          <div className="form-group mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Expiry Month
              </label>
              <input
                type="text"
                name="expiryMonth"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="MM"
                value={card.expiryMonth}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Expiry Year
              </label>
              <input
                type="text"
                name="expiryYear"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="YY"
                value={card.expiryYear}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                required
              />
            </div>
          </div>

          <div className="form-group mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              CVC
            </label>
            <input
              type="tel"
              name="cvv"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="CVC"
              value={card.cvv}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              required
            />
          </div>

          <div className="form-actions mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Add Card
            </button>
          </div>
        </form>
      </div>

      <Toaster position="top-right" />
    </div>
  );
}
