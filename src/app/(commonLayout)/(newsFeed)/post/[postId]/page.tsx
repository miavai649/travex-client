'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Card, CardBody, CardFooter } from '@nextui-org/card'
import { Avatar } from '@nextui-org/avatar'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Divider } from '@nextui-org/divider'
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  MapPin,
  Send,
  Bookmark
} from 'lucide-react'
import { useGetSinglePostQuery } from '@/src/redux/features/post/postApi'
import Loading from '@/src/components/ui/Loading'
import DetailPageImageGallery from '@/src/components/ui/post/DetailPageImageGallery'
import PostDetailsCard from '@/src/components/ui/post/PostDetailsCard'
import { useGetMyCommentQuery } from '@/src/redux/features/comment/commentApi'
import Comment from '@/src/components/ui/post/comment'
import { Spinner } from '@nextui-org/spinner'

interface IProps {
  params: {
    postId: string
  }
}

export default function PostDetails({ params }: IProps) {
  // getting single post data
  const { data: postData, isLoading: postLoading } = useGetSinglePostQuery(
    params.postId
  )

  // getting comments for that individual post
  const { data: commentData, isLoading: commentLoading } = useGetMyCommentQuery(
    postData?.data?._id,
    {
      skip: postLoading
    }
  )

  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      {postLoading ? (
        <Loading />
      ) : (
        <PostDetailsCard postData={postData?.data!} />
      )}

      <Divider className='my-8' />
      {postLoading || commentLoading ? (
        <div className='h-full w-full flex justify-center items-center'>
          <Spinner size='lg' />
        </div>
      ) : (
        <Comment commentData={commentData?.data!} />
      )}
    </div>
  )
}
