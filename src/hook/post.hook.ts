'use client'

import { useGetAllPostQuery } from '../redux/features/post/postApi'

export const useGetAllPost = () => {
  return useGetAllPostQuery({})
}
