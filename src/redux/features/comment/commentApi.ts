import { TResponseRedux, TUser } from '@/src/types'
import { baseApi } from '../../api/baseApi'
import { IPost } from '@/src/types/post.type'
import { TComment } from '@/src/types/comment.type'

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addComment: builder.mutation({
      query: (payload) => {
        return {
          url: '/comment/create-comment',
          method: 'POST',
          body: payload
        }
      },
      invalidatesTags: ['comment', 'posts']
    }),
    deleteComment: builder.mutation({
      query: (commentId) => {
        return {
          url: `/comment/${commentId}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['comment', 'posts']
    }),
    getMyComment: builder.query({
      query: (params) => {
        return {
          url: `/comment/${params}`,
          method: 'GET'
        }
      },
      transformResponse: (response: TResponseRedux<TComment[]>) => {
        return {
          data: response.data
        }
      },
      providesTags: ['comment']
    })
  })
})

export const {
  useGetMyCommentQuery,
  useAddCommentMutation,
  useDeleteCommentMutation
} = commentApi
