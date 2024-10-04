import { TUser } from '.'

export interface IPost {
  _id: string
  title: string
  content: string
  author: TUser
  images: string[]
  category: string
  upvote: number
  downvote: number
  isPremium: boolean
  isDelete: boolean
  createdAt: string
  updatedAt: string
  __v: number
  location: string
}
