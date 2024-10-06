'use client'

import { useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  MapPin,
  MessageCircle,
  Send
} from 'lucide-react'
import { Card, CardBody, CardFooter } from '@nextui-org/card'
import { Avatar } from '@nextui-org/avatar'
import { Button } from '@nextui-org/button'
import ImageGallery from './ImageGallery'
import { IPost } from '@/src/types/post.type'
import { useAppSelector } from '@/src/redux/hook'
import { useCurrentUser } from '@/src/redux/features/auth/authSlice'
import { useHandleVotingMutation } from '@/src/redux/features/post/postApi'

export default function PostCard({ post }: { post: IPost }) {
  // getting current logged in user from redux
  const user = useAppSelector(useCurrentUser)

  // handle voting for post
  const [handleVote] = useHandleVotingMutation()

  const handleUpvote = async (id: string) => {
    const upvoteData = {
      id,
      data: {
        action: 'upvote'
      }
    }

    await handleVote(upvoteData)
  }

  const handleDownvote = async (id: string) => {
    const downvoteData = {
      id,
      data: {
        action: 'downvote'
      }
    }
    await handleVote(downvoteData)
  }

  const handleShare = () => {
    console.log('Sharing post:', post._id)
    // Implement actual share functionality here
  }

  return (
    <Card className='max-w-xl w-full mx-auto'>
      <CardBody className='p-4'>
        {/* author information */}
        <div className='flex items-center mb-4'>
          <Avatar
            src={post?.author?.profileImage}
            alt={post?.author?.name}
            className='mr-3'
          />
          <div>
            <p className='font-semibold text-lg'>{post?.author?.name}</p>
            <p className='text-sm text-default-500'>
              {format(new Date(post?.createdAt), 'MMM dd, yyyy')}
            </p>
          </div>
        </div>

        <Link href={`/post/${post?._id}`} className='block mb-2'>
          <h1 className='text-2xl font-bold hover:text-blue-600 transition duration-300'>
            {post?.title}
          </h1>
        </Link>
        <p className='text-default-700 dark:text-default-400 mb-4'>
          {post?.content?.substring(0, 150)}...
        </p>
        <div className='flex items-center mb-4'>
          <MapPin className='w-4 h-4 text-default-500 mr-1' />
          <span className='text-sm text-default-500'>{post?.location}</span>
        </div>
        <div className='flex flex-wrap gap-2 mb-4'>
          <span className='bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs font-semibold px-2.5 py-0.5 rounded'>
            {post?.category}
          </span>
          {/* {post?.isPremium && (
            <span className='bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 text-xs font-semibold px-2.5 py-0.5 rounded'>
              Premium
            </span>
          )} */}
          <span className='bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 text-xs font-semibold px-2.5 py-0.5 rounded'>
            Premium
          </span>
        </div>

        {/* post images */}
        <ImageGallery images={post?.images} />
      </CardBody>
      <CardFooter className='flex flex-wrap justify-between items-center px-4 py-3 bg-default-100 dark:bg-default-50'>
        <div className='flex space-x-4 mb-2 sm:mb-0'>
          <Button
            size='sm'
            className={`${!post?.upvote?.includes(user?._id || '') ? 'text-default-500' : 'text-blue-600'}`}
            variant='light'
            onClick={() => handleUpvote(post?._id)}>
            <ThumbsUp className='w-5 h-5' />
            <span>{post?.upvote?.length}</span>
          </Button>
          <Button
            size='sm'
            className={`${!post?.downvote?.includes(user?._id || '') ? 'text-default-500' : 'text-red-600'}`}
            variant='light'
            onClick={() => handleDownvote(post?._id)}>
            <ThumbsDown className='w-5 h-5' />
            <span>{post?.downvote?.length}</span>
          </Button>
          <Link href={`/post/${post?._id}`}>
            <Button
              size='sm'
              variant='light'
              className='text-default-500 hover:text-blue-600'>
              <MessageCircle className='w-5 h-5' />
              <span>{post?.commentCount}</span>
            </Button>
          </Link>
        </div>
        <Button
          size='sm'
          variant='light'
          onClick={handleShare}
          className='text-default-500 hover:text-blue-600'>
          <Share2 className='w-5 h-5' />
          <span>Share</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
