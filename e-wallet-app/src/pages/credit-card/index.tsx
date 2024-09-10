import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import HeaderDefault from "../../components/header/header_default";
import {
  getCardList,
  deleteCreditCard,
} from "../../redux/credit-card/cardThunk";
import { clearMessage } from "../../redux/credit-card/cardSlice";
import { AppDispatch, RootState } from "../../redux/store";
import Modal from "./modal";
import AddCreditCard from "./add-credit-card";
import { FiTrash2 } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

export default function CreditCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCardList());
  }, [dispatch]);

  const state = useSelector((state: RootState) => state.cards);
  const {
    cardState: { cards },
    isFetching,
    message,
  } = state;

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [message, dispatch]);

  const handleDeleteCard = (id: string) => {
    toast(
      (t) => (
        <div>
          <p>Bạn có chắc chắn muốn xóa thẻ này?</p>
          <div className="mt-2 flex justify-center">
            <button
              className="mr-2 bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-700"
              onClick={() => {
                dispatch(deleteCreditCard(id));
                toast.dismiss(t.id);
              }}
            >
              Xóa
            </button>
            <button
              className="bg-gray-600 text-white py-1 px-2 rounded-md hover:bg-gray-700"
              onClick={() => toast.dismiss(t.id)}
            >
              Hủy
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
      }
    );
  };

  const handleAddCardClick = () => {
    dispatch(clearMessage());
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="p-4 border bg-white m-2 rounded-xl shadow-lg h-fit w-full">
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
          <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => (
              <div
                key={card._id}
                className="relative"
                onMouseEnter={() => setHoveredCardId(card._id ?? null)}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                <Cards
                  number={card.number}
                  expiry={`${card.expiryMonth}/${card.expiryYear}`}
                  cvc={card.cvv}
                  name={card.name}
                />
                <div
                  className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl transition-opacity duration-300 ${
                    hoveredCardId === card._id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <button
                    className="text-red-600 text-2xl hover:text-red-800 transition-colors"
                    onClick={() => {
                      if (card._id) {
                        handleDeleteCard(card._id);
                      }
                    }}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <button
            className="text-white bg-blue-600 hover:bg-blue-700 font-semibold text-base transition-colors duration-300 py-2 px-4 rounded-lg shadow-md"
            onClick={handleAddCardClick}
          >
            Thêm thẻ
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddCreditCard />
      </Modal>
      <Toaster position="top-center" />
    </>
  );
}
