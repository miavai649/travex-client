import { TResponseRedux, TUser } from '@/src/types'
import { baseApi } from '../../api/baseApi'
import { IPost } from '@/src/types/post.type'

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
      transformResponse: (response: TResponseRedux<IPost>) => {
        return {
          data: response.data
        }
      },
      providesTags: ['posts']
    }),
    getSinglePost: builder.query({
      query: (params) => {
        return {
          url: `/post/${params}`,
          method: 'GET'
        }
      },
      transformResponse: (response: TResponseRedux<IPost>) => {
        return {
          data: response.data
        }
      },
      providesTags: ['posts']
    })
  })
})

export const { useGetAllPostQuery, useGetSinglePostQuery } = postApi
