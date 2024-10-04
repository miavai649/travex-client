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

interface IProps {
  params: {
    postId: string
  }
}

export default function PostDetails({ params }: IProps) {
  // getting single post data
  const { data: postData, isLoading } = useGetSinglePostQuery(params.postId)

  // getting comments for that individual post
  const { data: commentData } = useGetMyCommentQuery(postData?.data?._id)

  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      {isLoading ? <Loading /> : <PostDetailsCard postData={postData?.data!} />}

      <Divider className='my-8' />

      <Comment commentData={commentData?.data!} />
    </div>
  )
}
