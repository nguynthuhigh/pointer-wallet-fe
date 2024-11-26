import { useEffect, useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { FiTrash2 } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import HeaderDefault from "../../components/header/header_default";
import Modal from "./components/modal";
import AddCreditCard from "./pages/add-credit-card";
import Loading from "../loading";

import {
  useGetCreditCardsQuery,
  useDeleteCreditCardMutation,
} from "../../redux/features/credit-card/creditCardApi";

interface ErrorType {
  message: string;
}

export default function CreditCard() {
  const { data, isLoading } = useGetCreditCardsQuery(undefined, {
    pollingInterval: 20000,
    skipPollingIfUnfocused: true,
  });
  const [deleteCreditCard, { isLoading: isDeleting, error: deleteError }] =
    useDeleteCreditCardMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [deleteCardId, setDeleteCardId] = useState<string | null>(null);

  const cards = data?.data;
  if (isLoading) return <Loading />;

  useEffect(() => {
    if (deleteError) {
      toast.error((deleteError as ErrorType)?.message || "Xóa thẻ thất bại!");
    }
  }, [deleteError]);

  const handleDeleteCard = (id: string) => {
    setDeleteCardId(id);
  };

  const confirmDeleteCard = async () => {
    if (deleteCardId) {
      const response = await deleteCreditCard(deleteCardId);
      if (response.data?.message) toast.success(response.data.message);
      setDeleteCardId(null);
    }
  };

  return (
    <>
      <div className="p-4 border bg-white sm:m-2 sm:rounded-xl sm:shadow-lg h-fit w-full">
        <HeaderDefault title="Quản lý thẻ" />
        {isLoading || isDeleting ? (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="animate-pulse p-4 bg-gray-200 rounded-xl h-[182px] w-[290px] shadow-md mx-auto"
              ></div>
            ))}
          </div>
        ) : cards?.length === 0 ? (
          <p className="text-center text-gray-500">
            Bạn chưa có liên kết với bất kỳ thẻ nào!
          </p>
        ) : (
          <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {cards &&
              cards.map((card) => (
                <div
                  key={card._id}
                  className="relative w-[290px] h-[182px] mx-auto"
                  onMouseEnter={() => setHoveredCardId(card._id ?? null)}
                  onMouseLeave={() => setHoveredCardId(null)}
                >
                  <Cards
                    number={card.number}
                    expiry={`${card.expiryMonth}/${card.expiryYear}`}
                    cvc={card.cvc || 0}
                    name={card.name}
                  />
                  <div
                    className={`absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 rounded-xl transition-opacity duration-300 ${
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
            onClick={() => setIsModalOpen(true)}
          >
            Thêm thẻ
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddCreditCard />
      </Modal>

      {deleteCardId && (
        <Modal isOpen={!!deleteCardId} onClose={() => setDeleteCardId(null)}>
          <div className="p-1 sm:p-4 w-full">
            <p className={`text-center text-lg text-gray-600`}>
              Bạn có chắc chắn muốn xóa thẻ này?
            </p>
            <div className="mt-2 flex justify-center">
              <button
                className="mr-2 bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-700"
                onClick={confirmDeleteCard}
              >
                Xóa
              </button>
              <button
                className="bg-gray-600 text-white py-1 px-2 rounded-md hover:bg-gray-700"
                onClick={() => setDeleteCardId(null)}
              >
                Hủy
              </button>
            </div>
          </div>
        </Modal>
      )}

      <Toaster position="top-center" />
    </>
  );
}
