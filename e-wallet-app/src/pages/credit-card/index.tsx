import { Link, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import HeaderDefault from "../../components/header/header_default";
import { getCardList } from "../../redux/credit-card/cardThunk";
import { AppDispatch, RootState } from "../../redux/store";

export default function CreditCard() {
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
      <div className="p-4 border bg-white m-2 rounded-lg w-full shadow-xl h-fit">
        <HeaderDefault title="Quản lý thẻ" />
        {isFetching ? (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="animate-pulse p-4 bg-gray-400 rounded-2xl h-[182px] w-[290px] shadow-lg mx-auto"
              ></div>
            ))}
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
        <div className="mt-4">
          <Link to={`add-card`} className="text-blue-500">
            Thêm thẻ
          </Link>
        </div>
      </div>
      <Toaster position="top-center" />
      <Outlet />
    </>
  );
}
