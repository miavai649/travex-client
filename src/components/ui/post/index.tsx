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

// Dummy data (unchanged)
const dummyPost = {
  _id: '1',
  title: 'Exploring the Hidden Gems of Bali',
  content:
    'Bali, known for its lush landscapes and vibrant culture, offers more than just popular tourist spots. In this post, we delve into the lesser-known areas that provide a truly authentic experience...',
  author: {
    _id: '101',
    name: 'Jane Doe',
    email: 'jane@example.com',
    profileImage: 'https://i.pravatar.cc/150?img=1'
  },
  images: [
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhbGl8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJhbGl8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmFsaXxlbnwwfHwwfHx8MA%3D%3D',
    'https://res.cloudinary.com/dupg5agtg/image/upload/v1727961678/7yz07h5g7r8-1727961676033-bandorban.jpg',
    'https://res.cloudinary.com/dupg5agtg/image/upload/v1727961678/7yz07h5g7r8-1727961676033-bandorban.jpg'
  ],
  category: 'Adventure',
  isPremium: true,
  createdAt: '2024-03-15T10:00:00Z',
  location: 'Bali, Indonesia',
  upvotes: 124,
  downvotes: 7,
  comments: [
    {
      id: '1',
      author: 'John Doe',
      content: 'Great post! I loved my trip to Bali.',
      createdAt: '2024-03-16T08:30:00Z'
    },
    {
      id: '2',
      author: 'Alice Smith',
      content: 'Thanks for sharing these hidden gems!',
      createdAt: '2024-03-16T09:15:00Z'
    }
  ]
}

export default function PostCard() {
  const [post, setPost] = useState(dummyPost)
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  // const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')

  const handleUpvote = () => {
    if (!isLiked) {
      setPost((prev) => ({ ...prev, upvotes: prev.upvotes + 1 }))
      setIsLiked(true)
      if (isDisliked) {
        setPost((prev) => ({ ...prev, downvotes: prev.downvotes - 1 }))
        setIsDisliked(false)
      }
    } else {
      setPost((prev) => ({ ...prev, upvotes: prev.upvotes - 1 }))
      setIsLiked(false)
    }
  }

  const handleDownvote = () => {
    if (!isDisliked) {
      setPost((prev) => ({ ...prev, downvotes: prev.downvotes + 1 }))
      setIsDisliked(true)
      if (isLiked) {
        setPost((prev) => ({ ...prev, upvotes: prev.upvotes - 1 }))
        setIsLiked(false)
      }
    } else {
      setPost((prev) => ({ ...prev, downvotes: prev.downvotes - 1 }))
      setIsDisliked(false)
    }
  }

  const handleShare = () => {
    console.log('Sharing post:', post._id)
    // Implement actual share functionality here
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      const comment = {
        id: String(post.comments.length + 1),
        author: 'Current User', // Replace with actual user name when authentication is implemented
        content: newComment,
        createdAt: new Date().toISOString()
      }
      setPost((prev) => ({ ...prev, comments: [...prev.comments, comment] }))
      setNewComment('')
    }
  }

  return (
    <Card className='max-w-2xl mx-auto'>
      <CardBody className='p-4'>
        {/* author information */}
        <div className='flex items-center mb-4'>
          <Avatar
            src={post.author.profileImage}
            alt={post.author.name}
            className='mr-3'
          />
          <div>
            <p className='font-semibold text-lg'>{post.author.name}</p>
            <p className='text-sm text-default-500'>
              {format(new Date(post.createdAt), 'MMM dd, yyyy')}
            </p>
          </div>
        </div>

        <Link href={`/posts/${post._id}`} className='block mb-2'>
          <h1 className='text-2xl font-bold hover:text-blue-600 transition duration-300'>
            {post.title}
          </h1>
        </Link>
        <p className='text-default-700 dark:text-default-400 mb-4'>
          {post.content.substring(0, 150)}...
        </p>
        <div className='flex items-center mb-4'>
          <MapPin className='w-4 h-4 text-default-500 mr-1' />
          <span className='text-sm text-default-500'>{post.location}</span>
        </div>
        <div className='flex flex-wrap gap-2 mb-4'>
          <span className='bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs font-semibold px-2.5 py-0.5 rounded'>
            {post.category}
          </span>
          {post.isPremium && (
            <span className='bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 text-xs font-semibold px-2.5 py-0.5 rounded'>
              Premium
            </span>
          )}
        </div>

        {/* post images */}
        <ImageGallery images={post.images} />
      </CardBody>
      <CardFooter className='flex flex-wrap justify-between items-center px-4 py-3 bg-default-100 dark:bg-default-50'>
        <div className='flex space-x-4 mb-2 sm:mb-0'>
          <Button
            size='sm'
            variant='light'
            onClick={handleUpvote}
            className={`${isLiked ? 'text-blue-600' : 'text-default-500'}`}>
            <ThumbsUp className='w-5 h-5' />
            <span>{post.upvotes}</span>
          </Button>
          <Button
            size='sm'
            variant='light'
            onClick={handleDownvote}
            className={`${isDisliked ? 'text-red-600' : 'text-default-500'}`}>
            <ThumbsDown className='w-5 h-5' />
            <span>{post.downvotes}</span>
          </Button>
          <Button
            size='sm'
            variant='light'
            // onClick={() => setShowComments(!showComments)}
            className='text-default-500 hover:text-blue-600'>
            <MessageCircle className='w-5 h-5' />
            <span>{post.comments.length}</span>
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
            {post.comments.map((comment) => (
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
