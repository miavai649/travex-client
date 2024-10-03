import { TResponseRedux, TUser } from '@/src/types'
import { baseApi } from '../../api/baseApi'

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // resetPassword: builder.mutation({
    //   query: (userInfo) => {
    //     return {
    //       url: '/auth/reset-password',
    //       method: 'POST',
    //       body: { email: userInfo?.email, newPassword: userInfo?.newPassword },
    //       headers: {
    //         Authorization: userInfo?.token
    //       }
    //     }
    //   }
    // }),
    getAllPost: builder.query({
      query: () => {
        return {
          url: '/post',
          method: 'GET'
        }
      },
      transformResponse: (response: TResponseRedux<TUser>) => {
        return {
          data: response.data
        }
      }
    })
  })
})

export const { useGetAllPostQuery } = postApi
