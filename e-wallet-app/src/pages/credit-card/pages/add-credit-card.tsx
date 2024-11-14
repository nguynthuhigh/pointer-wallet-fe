import React, { useState, useMemo, ChangeEvent, FocusEvent } from "react";
import Cards from "react-credit-cards-2";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import {
  formatCreditCardNumber,
  formatCVC,
} from "../../../utils/format-credit-card";
import Payment from "payment";
import { addCreditCard } from "../../../redux/credit-card/cardThunk";
import { Item as CardType } from "../../../services/api/credit-card.api";
import { AppDispatch, RootState } from "../../../redux/store";
import { Focused } from "../type";

import InputField from "../components/input-field";
import SelectField from "../components/select-field";

export default function AddCreditCard() {
  const [formData, setFormData] = useState({
    number: "",
    name: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardType: "credit",
  });
  const [focus, setFocus] = useState<Focused>(undefined);
  const [cvvLength, setCvvLength] = useState<number>(3);
  const [validity, setValidity] = useState({
    number: true,
    expiryMonth: true,
    expiryYear: true,
    cvv: true,
  });

  const dispatch = useDispatch<AppDispatch>();
  const { isFetching } = useSelector((state: RootState) => state.cards);

  const months = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0")),
    []
  );
  const years = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) =>
        (new Date().getFullYear() + i).toString()
      ),
    []
  );

  const resetForm = () => {
    setFormData({
      number: "",
      name: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      cardType: "credit",
    });
    setFocus(undefined);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;
    let formattedValue = value;

    if (name === "number") {
      formattedValue = formatCreditCardNumber(value);
      const cardType = Payment.fns.cardType(formattedValue);
      setCvvLength(cardType === "amex" ? 4 : 3);
      setFormData((prev) => ({
        ...prev,
        [name]: formattedValue,
        cardType: cardType || "debit",
      }));
    } else if (name === "cvv") {
      formattedValue = formatCVC(value, formData.number);
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleInputFocus = (
    e: FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFocus(e.currentTarget.name as Focused);
  };

  const validateCardData = () => {
    const { number, expiryMonth, expiryYear, cvv } = formData;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const cardType = Payment.fns.cardType(number);
    const hasValidCardType = Boolean(cardType);

    const isValidExpiry =
      parseInt(expiryYear) > currentYear ||
      (parseInt(expiryYear) === currentYear &&
        parseInt(expiryMonth) >= currentMonth);

    const newValidity = {
      number: hasValidCardType,
      expiryMonth: Boolean(expiryMonth) && isValidExpiry,
      expiryYear: Boolean(expiryYear) && isValidExpiry,
      cvv: cvv.length === cvvLength,
    };

    setValidity(newValidity);

    if (!newValidity.number) {
      toast.error("Số thẻ không hợp lệ.");
    } else if (!newValidity.expiryMonth || !newValidity.expiryYear) {
      toast.error("Ngày hết hạn không hợp lệ.");
    } else if (!newValidity.cvv) {
      toast.error("CVV không hợp lệ.");
    }

    return Object.values(newValidity).every(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateCardData()) return;

    const cardData: CardType = {
      ...formData,
      type: formData.cardType,
    };

    try {
      await dispatch(addCreditCard(cardData));
      resetForm();
    } catch {
      toast.error("Có lỗi khi thêm thẻ.");
    }
  };

  const LoadingIcon = () => (
    <svg
      className="animate-spin h-5 w-5 text-white mr-2"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  );

  return (
    <div className="p-4 border bg-white m-2 w-full max-w-lg rounded-2xl shadow-lg">
      <Cards
        number={formData.number}
        expiry={`${formData.expiryMonth}/${formData.expiryYear}`}
        cvc={formData.cvv}
        name={formData.name}
        focused={focus}
      />
      <form className="mt-6 space-y-6 border-gray-50" onSubmit={handleSubmit}>
        <InputField
          label="Số thẻ"
          name="number"
          value={formData.number}
          onChange={handleChange}
          onFocus={handleInputFocus}
          placeholder="1234 5678 9012 3456"
          maxLength={19}
        />
        <InputField
          label="Tên chủ thẻ"
          name="name"
          maxLength={50}
          value={formData.name}
          onChange={handleChange}
          onFocus={handleInputFocus}
          placeholder="Tên tài khoản"
        />
        <div className="flex space-x-4">
          <SelectField
            label="Tháng hết hạn"
            options={months}
            onChange={(value: string) =>
              setFormData((prev) => ({ ...prev, expiryMonth: value }))
            }
            isValid={validity.expiryMonth}
          />
          <SelectField
            label="Năm hết hạn"
            options={years}
            onChange={(value: string) =>
              setFormData((prev) => ({ ...prev, expiryYear: value }))
            }
            isValid={validity.expiryYear}
          />
        </div>
        <InputField
          label="CVV"
          name="cvv"
          value={formData.cvv}
          onChange={handleChange}
          onFocus={handleInputFocus}
          isValid={validity.cvv}
          maxLength={cvvLength}
          placeholder="123"
        />
        <button
          type="submit"
          className={`w-full p-3 text-white font-semibold rounded-md shadow-md flex items-center justify-center ${
            isFetching ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={isFetching}
        >
          {isFetching ? <LoadingIcon /> : "Thêm thẻ"}
        </button>
      </form>
    </div>
  );
}
