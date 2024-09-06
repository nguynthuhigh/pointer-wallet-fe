import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import HeaderDefault from "../../components/header/header_default";
import { getAllCards, Card } from "../../services/api/credit-card.api";

export default function CreditCard() {
  const [listCards, setListCards] = useState<Card[]>([]);
  const [isShowing, setIsShowing] = useState<boolean>(true);

  useEffect(() => {
    getListCards();
  }, []);

  const getListCards = async (): Promise<void> => {
    try {
      const response = await getAllCards();

      if (Array.isArray(response) && response.length > 0) {
        setListCards(response);
        setIsShowing(false);
      } else {
        setIsShowing(true);
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi khi tải thẻ!", error);
      toast.error("Đã xảy ra lỗi khi tải thẻ!");
    }
  };

  return (
    <>
      <div className="p-4 border bg-white m-2 rounded-lg w-1/2 max-w-[800px] shadow-xl h-fit">
        <HeaderDefault title="Quản lý thẻ" />
        {!isShowing && (
          <div className={`mt-4`}>
            {listCards.map((card, index) => (
              <Cards
                key={index}
                number={card.number}
                expiry={`${card.expiryMonth}/${card.expiryYear}`}
                cvc={card.cvv}
                name={card.name}
              />
            ))}
          </div>
        )}
        <div>
          <Link to={`add-card`}>Thêm thẻ</Link>
        </div>
      </div>
      <Toaster position="top-center" />
      <Outlet />
    </>
  );
}
