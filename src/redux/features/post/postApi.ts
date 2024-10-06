import { TResponseRedux, TUser } from '@/src/types'
import { baseApi } from '../../api/baseApi'
import { IPost } from '@/src/types/post.type'

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    handleVoting: builder.mutation({
      query: (payload) => {
        return {
          url: `/post/voting/${payload?.id}`,
          method: 'PUT',
          body: payload.data
        }
      },
      invalidatesTags: ['posts']
    }),
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

export const {
  useGetAllPostQuery,
  useGetSinglePostQuery,
  useHandleVotingMutation
} = postApi
