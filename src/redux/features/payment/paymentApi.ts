import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: (payload) => {
        return {
          url: `/payment/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["payment"],
    }),
  }),
});

export const { useCreatePaymentMutation } = paymentApi;
