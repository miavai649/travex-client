import { TResponseRedux, TUser } from '@/src/types'
import { baseApi } from '../../api/baseApi'

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: '/auth/register-user',
        method: 'POST',
        body: userInfo
      })
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: '/auth/login',
        method: 'POST',
        body: userInfo
      })
    }),
    forgetPassword: builder.mutation({
      query: (userInfo) => ({
        url: '/auth/forget-password',
        method: 'POST',
        body: userInfo
      })
    }),
    resetPassword: builder.mutation({
      query: (userInfo) => {
        return {
          url: '/auth/reset-password',
          method: 'POST',
          body: { email: userInfo?.email, newPassword: userInfo?.newPassword },
          headers: {
            Authorization: userInfo?.token
          }
        }
      }
    }),
    changePassword: builder.mutation({
      query: (payload) => {
        return {
          url: '/auth/change-password',
          method: 'PUT',
          body: payload
        }
      }
    }),
    getCurrentUser: builder.query({
      query: () => {
        return {
          url: '/user/current-user',
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

export const {
  useLoginMutation,
  useChangePasswordMutation,
  useRegisterMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useGetCurrentUserQuery
} = authApi
