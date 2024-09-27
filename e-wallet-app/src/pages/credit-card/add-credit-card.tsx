import React, { useState, ChangeEvent, FocusEvent, useEffect } from "react";
import Cards from "react-credit-cards-2";
import Select from "react-select";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import {
  formatCreditCardNumber,
  formatCVC,
} from "../../utils/format-credit-card";
import Payment from "payment";
import { addCreditCard } from "../../redux/credit-card/cardThunk";
import { Item as CardType } from "../../services/api/credit-card.api";
import { AppDispatch, RootState } from "../../redux/store";
import { clearMessage } from "../../redux/credit-card/cardSlice";

type Focused = "number" | "name" | "expiry" | "cvc" | undefined;

export default function AddCreditCard() {
  const dispatch = useDispatch<AppDispatch>();
  const { isFetching, error, message } = useSelector(
    (state: RootState) => state.cards
  );
  const [number, setNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [expiryMonth, setExpiryMonth] = useState<string>("");
  const [expiryYear, setExpiryYear] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [cvvLength, setCvvLength] = useState<number>(3);
  const [focus, setFocus] = useState<Focused>(undefined);
  const [isNumberValid, setIsNumberValid] = useState<boolean>(true);
  const [isExpiryMonthValid, setIsExpiryMonthValid] = useState<boolean>(true);
  const [isExpiryYearValid, setIsExpiryYearValid] = useState<boolean>(true);
  const [isCvvValid, setIsCvvValid] = useState<boolean>(true);
  const months = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const years = Array.from({ length: 10 }, (_, i) =>
    (new Date().getFullYear() + i).toString()
  );

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
      resetForm();
    } else if (error) {
      toast.error(error);
    }
  }, [message, error]);

  const resetForm = () => {
    setNumber("");
    setName("");
    setExpiryMonth("");
    setExpiryYear("");
    setCvv("");
    setFocus(undefined);
  };

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

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = formatCreditCardNumber(e.target?.value);
    setNumber(value);

    const cardType = Payment.fns.cardType(value);
    if (cardType === "amex") {
      setCvvLength(4);
    } else {
      setCvvLength(3);
    }
  };

  const validateCardData = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const cardType = Payment.fns.cardType(number);

    let isValid = true;

    if (!number || !name || !expiryMonth || !expiryYear || !cvv) {
      toast.error("Vui lòng nhập đầy đủ thông tin thẻ");
      isValid = false;
    }

    if (
      parseInt(expiryYear, 10) < currentYear ||
      (parseInt(expiryYear, 10) === currentYear &&
        parseInt(expiryMonth, 10) <= currentMonth)
    ) {
      setIsExpiryMonthValid(false);
      setIsExpiryYearValid(false);
      toast.error("Tháng và năm hết hạn không hợp lệ");
      isValid = false;
    } else {
      setIsExpiryMonthValid(true);
      setIsExpiryYearValid(true);
    }

    if (!cardType) {
      setIsNumberValid(false);
      toast.error("Số thẻ không hợp lệ");
      isValid = false;
    } else {
      setIsNumberValid(true);
    }

    if (cvv.length !== cvvLength) {
      setIsCvvValid(false);
      toast.error("CVV không hợp lệ");
      isValid = false;
    } else {
      setIsCvvValid(true);
    }

    return isValid;
  };

  const addCard = async (cardData: CardType) => {
    return await dispatch(addCreditCard(cardData));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateCardData()) {
      return;
    }

    const cardData = {
      number,
      name,
      expiryMonth,
      expiryYear,
      cvv,
      type: Payment.fns.cardType(number),
    };

    try {
      await addCard(cardData);
    } catch (error) {
      toast.error("Đã xảy ra lỗi trong quá trình thêm thẻ");
    }
  };

  const monthOptions = months.map((month) => ({ value: month, label: month }));
  const yearOptions = years.map((year) => ({ value: year, label: year }));

  return (
    <div className="p-4 border bg-white m-2 w-full max-w-lg rounded-2xl shadow-lg">
      <Cards
        number={number}
        expiry={`${expiryMonth}/${expiryYear}`}
        cvc={cvv}
        name={name}
        focused={focus}
      />
      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700">
            Số thẻ
          </label>
          <input
            type="text"
            name="number"
            className={`mt-1 p-3 block w-full border ${
              isNumberValid ? "border-gray-300" : "border-red-500"
            } rounded-md focus:outline-blue-default`}
            value={number}
            onChange={handleNumberChange}
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
              className={`react-select-container ${
                isExpiryMonthValid ? "" : "border-red-500"
              }`}
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
              className={`react-select-container ${
                isExpiryYearValid ? "" : "border-red-500"
              }`}
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
            className={`mt-1 p-3 block w-full border ${
              isCvvValid ? "border-gray-300" : "border-red-500"
            } rounded-md focus:outline-blue-default`}
            value={cvv}
            onChange={(e) =>
              handleInputChange(e, setCvv, (value) => formatCVC(value, number))
            }
            onFocus={handleInputFocus}
            maxLength={cvvLength}
            placeholder="123"
          />
        </div>

        <button
          type="submit"
          className={`w-full p-3 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    ${isFetching ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
          disabled={isFetching}
        >
          {isFetching ? (
            <div className="flex justify-center items-center">
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
              Đang xử lý...
            </div>
          ) : (
            "Thêm thẻ"
          )}
        </button>
      </form>
      {/* <Toaster position="top-right" /> */}
    </div>
  );
}
