import { baseApi } from '../../api/baseApi'

import { TResponseRedux } from '@/src/types'
import { IPost } from '@/src/types/post.type'

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPost: builder.query({
      query: () => {
        return {
          url: '/post/get-all',
          method: 'GET'
        }
      },
      transformResponse: (response: TResponseRedux<IPost[]>) => {
        return {
          data: response.data
        }
      },
      providesTags: ['posts']
    }),
    getCurrentUserPost: builder.query({
      query: () => {
        return {
          url: '/post/get-current-user-post',
          method: 'GET'
        }
      },
      transformResponse: (response: TResponseRedux<IPost[]>) => {
        return {
          data: response.data
        }
      },
      providesTags: ['posts']
    }),
    getSinglePost: builder.query({
      query: (params) => {
        return {
          url: `/post/get-single/${params}`,
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
    addPost: builder.mutation({
      query: (payload) => {
        return {
          url: `/post/create-post`,
          method: 'POST',
          body: payload
        }
      },
      invalidatesTags: ['posts']
    }),
    updatePost: builder.mutation({
      query: (payload) => {
        return {
          url: `/post/${payload.id}`,
          method: 'PUT',
          body: payload.data
        }
      },
      invalidatesTags: ['posts']
    })
  })
})

export const {
  useGetAllPostQuery,
  useGetSinglePostQuery,
  useHandleVotingMutation,
  useAddPostMutation,
  useGetCurrentUserPostQuery,
  useUpdatePostMutation
} = postApi
