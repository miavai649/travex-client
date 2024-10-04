import { TResponseRedux, TUser } from '@/src/types'
import { baseApi } from '../../api/baseApi'
import { IPost } from '@/src/types/post.type'
import { TComment } from '@/src/types/comment.type'

const commentApi = baseApi.injectEndpoints({
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
    getMyComment: builder.query({
      query: (params) => {
        return {
          url: `/comment/${params}`,
          method: 'GET'
        }
      },
      transformResponse: (response: TResponseRedux<TComment>) => {
        return {
          data: response.data
        }
      }
    })
  })
})

export const { useGetMyCommentQuery} = commentApi
