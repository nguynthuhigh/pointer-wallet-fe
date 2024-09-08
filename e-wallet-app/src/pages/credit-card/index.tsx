import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import HeaderDefault from "../../components/header/header_default";
import { getCardList } from "../../redux/credit-card/cardThunk";
import { AppDispatch, RootState } from "../../redux/store";

export default function CreditCard() {
  const [displayBtn, setDisplayBtn] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCardList());
  }, [dispatch]);

  const state = useSelector((state: RootState) => state.cards);
  const {
    cardState: { cards },
    isFetching,
  } = state;

  return (
    <>
      <div
        className={`p-4 border bg-white m-2 rounded-xl shadow-lg h-fit max-w-[700px]"
        `}
      >
        <HeaderDefault title="Quản lý thẻ" />
        {isFetching ? (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="animate-pulse p-4 bg-gray-300 rounded-xl h-[182px] w-[290px] shadow-md mx-auto"
              ></div>
            ))}
          </div>
        ) : (
          <div
            className={`mt-6 grid gap-6 ${
              displayBtn
                ? "grid-cols-2"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {cards.map((card) => (
              <Cards
                key={card._id}
                number={card.number}
                expiry={`${card.expiryMonth}/${card.expiryYear}`}
                cvc={card.cvv}
                name={card.name}
              />
            ))}
          </div>
        )}
        <div className="mt-6 flex justify-center">
          <Link
            to={`add-card`}
            className={`${
              displayBtn
                ? "hidden"
                : "text-white bg-blue-600 hover:bg-blue-700 font-semibold text-base transition-colors duration-300 py-2 px-4 rounded-lg shadow-md"
            } `}
            onClick={() => setDisplayBtn(!displayBtn)}
          >
            Thêm thẻ
          </Link>
        </div>
      </div>
      <Toaster position="top-center" />
      <Outlet />
    </>
  );
}
