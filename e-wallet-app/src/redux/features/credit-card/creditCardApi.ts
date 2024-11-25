import { apiSlice } from "../api/apiSlice";
import {
  ICreditCard,
  ICreditCardDetail,
  ICreditCardAD,
  CreditCard,
} from "./cardType";

export const creditCardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCreditCards: builder.query<ICreditCard, void>({
      query: () => "/api/v1/card/get-cards",
      keepUnusedDataFor: 60,
      providesTags: (result) =>
        result?.data
          ? [
              { type: "CreditCard", id: "LIST" },
              ...result.data.map((card) => ({
                type: "CreditCard" as const,
                id: card._id,
              })),
            ]
          : [{ type: "CreditCard", id: "LIST" }],
    }),
    addCreditCard: builder.mutation<ICreditCardAD, Omit<CreditCard, "_id">>({
      query: (newCard) => ({
        url: "/api/v1/card/add-card",
        method: "POST",
        body: newCard,
      }),
      invalidatesTags: [{ type: "CreditCard", id: "LIST" }],
    }),
    deleteCreditCard: builder.mutation<ICreditCardDetail, string>({
      query: (id) => ({
        url: `/api/v1/card/delete-card/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "CreditCard", id }],
    }),
    detailCreditCard: builder.query<ICreditCardAD, string>({
      query: (id) => `/api/v1/card/details/${id}`,
      providesTags: (_result, _error, id) => [{ type: "CreditCard", id }],
    }),
  }),
});

export const {
  useGetCreditCardsQuery,
  useAddCreditCardMutation,
  useDeleteCreditCardMutation,
  useDetailCreditCardQuery,
} = creditCardApi;
