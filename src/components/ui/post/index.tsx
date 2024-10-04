'use client'

import { useState } from 'react'
import Image from 'next/image'
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
import { Input } from '@nextui-org/input'
import ImageGallery from './ImageGallery'
import { IPost } from '@/src/types/post.type'

export default function PostCard({ post }: { post: IPost }) {
  const [postData, setPostData] = useState(post)
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  // const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')

  const handleUpvote = () => {
    if (!isLiked) {
      setPostData((prev) => ({ ...prev, upvote: prev.upvote + 1 }))
      setIsLiked(true)
      if (isDisliked) {
        setPostData((prev) => ({ ...prev, downvote: prev.downvote - 1 }))
        setIsDisliked(false)
      }
    } else {
      setPostData((prev) => ({ ...prev, upvote: prev.upvote - 1 }))
      setIsLiked(false)
    }
  }

  const handleDownvote = () => {
    if (!isDisliked) {
      setPostData((prev) => ({ ...prev, downvote: prev.downvote + 1 }))
      setIsDisliked(true)
      if (isLiked) {
        setPostData((prev) => ({ ...prev, upvote: prev.upvote - 1 }))
        setIsLiked(false)
      }
    } else {
      setPostData((prev) => ({ ...prev, downvote: prev.downvote - 1 }))
      setIsDisliked(false)
    }
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
            variant='light'
            onClick={handleUpvote}
            className={`${isLiked ? 'text-blue-600' : 'text-default-500'}`}>
            <ThumbsUp className='w-5 h-5' />
            <span>{post?.upvote}</span>
          </Button>
          <Button
            size='sm'
            variant='light'
            onClick={handleDownvote}
            className={`${isDisliked ? 'text-red-600' : 'text-default-500'}`}>
            <ThumbsDown className='w-5 h-5' />
            <span>{post?.downvote}</span>
          </Button>
          <Button
            size='sm'
            variant='light'
            // onClick={() => setShowComments(!showComments)}
            className='text-default-500 hover:text-blue-600'>
            <MessageCircle className='w-5 h-5' />
            <span>{/* {post?.comments.length} */}0</span>
          </Button>
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
      {/* {showComments && (
        <CardBody className='px-4 py-3 bg-default-100 dark:bg-default-50'>
          <h3 className='font-semibold mb-2'>Comments</h3>
          <div className='space-y-2 mb-4'>
            {post?.comments.map((comment) => (
              <Card key={comment.id} className='p-2'>
                <p className='font-semibold text-sm'>{comment.author}</p>
                <p className='text-sm'>{comment.content}</p>
                <p className='text-xs text-default-500'>
                  {format(new Date(comment.createdAt), 'MMM dd, yyyy HH:mm')}
                </p>
              </Card>
            ))}
          </div>
          <form onSubmit={handleCommentSubmit} className='flex items-center'>
            <Input
              type='text'
              value={newComment}
              // onChange={(e) => setNewComment(e.target.value)}
              placeholder='Add a comment...'
              className='flex-grow mr-2'
            />
            <Button type='submit' color='primary' isIconOnly>
              <Send className='w-5 h-5' />
            </Button>
          </form>
        </CardBody>
      )} */}
    </Card>
  )
}
