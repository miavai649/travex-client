'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import { Avatar } from '@nextui-org/avatar'
import { Button } from '@nextui-org/button'
import { Divider } from '@nextui-org/divider'
import { Bookmark, MapPin, Share2, ThumbsDown, ThumbsUp } from 'lucide-react'
import DetailPageImageGallery from './DetailPageImageGallery'
import { IPost } from '@/src/types/post.type'

const dummyPost = {
  _id: '66fe9881e9a1bf14747b1d66',
  title: 'Top 5 Budget-Friendly Destinations for 2024',
  description:
    'Explore affordable travel destinations for your next vacation without breaking the bank.',
  content: `
    <h2>1. Bali, Indonesia</h2>
    <p>Known for its stunning beaches and rich culture, Bali offers a perfect blend of relaxation and adventure.</p>
    <img src="https://res.cloudinary.com/dupg5agtg/image/upload/v1727961214/3yzrft3h5n6-1727961212263-sylhet.jpg" alt="Bali beach" />
    
    <h2>2. Lisbon, Portugal</h2>
    <p>With its charming streets and delicious cuisine, Lisbon is a budget-friendly European gem.</p>
    
    <h2>3. Chiang Mai, Thailand</h2>
    <p>Experience the beauty of Northern Thailand without breaking the bank.</p>
    <img src="https://res.cloudinary.com/dupg5agtg/image/upload/v1727961216/7dqqb3ub3mr-1727961213861-hobiganj.jpg" alt="Chiang Mai temple" />
    
    <h2>4. Mexico City, Mexico</h2>
    <p>Immerse yourself in vibrant culture and history at an affordable price.</p>
    
    <h2>5. Krakow, Poland</h2>
    <p>Discover Eastern European charm and history on a budget.</p>
    <img src="https://res.cloudinary.com/dupg5agtg/image/upload/v1727961217/jx4tdu7tlck-1727961214895-sunamganj.jpg" alt="Krakow old town" />
  `,
  author: {
    _id: '66fd139fe7d6392a421d7db8',
    name: 'Maruf Khan',
    email: 'khan@gmail.com',
    profileImage: 'https://i.ibb.co.com/vkVW6s0/download.png'
  },
  images: [
    'https://res.cloudinary.com/dupg5agtg/image/upload/v1727961214/3yzrft3h5n6-1727961212263-sylhet.jpg',
    'https://res.cloudinary.com/dupg5agtg/image/upload/v1727961216/7dqqb3ub3mr-1727961213861-hobiganj.jpg',
    'https://res.cloudinary.com/dupg5agtg/image/upload/v1727961217/jx4tdu7tlck-1727961214895-sunamganj.jpg'
  ],
  category: 'Budget Travel',
  upvote: 0,
  downvote: 0,
  isPremium: false,
  isDelete: false,
  createdAt: '2024-10-03T13:13:37.494Z',
  updatedAt: '2024-10-03T13:13:37.494Z',
  location: 'Sunamganj, Sylhet'
}

interface IProps {
  postData: IPost
}

const PostDetailsCard = ({ postData }: IProps) => {
  const [post, setPost] = useState(dummyPost)
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleUpvote = () => {
    if (!isLiked) {
      setPost((prev) => ({ ...prev, upvote: prev.upvote + 1 }))
      setIsLiked(true)
      if (isDisliked) {
        setPost((prev) => ({ ...prev, downvote: prev.downvote - 1 }))
        setIsDisliked(false)
      }
    } else {
      setPost((prev) => ({ ...prev, upvote: prev.upvote - 1 }))
      setIsLiked(false)
    }
  }

  const handleDownvote = () => {
    if (!isDisliked) {
      setPost((prev) => ({ ...prev, downvote: prev.downvote + 1 }))
      setIsDisliked(true)
      if (isLiked) {
        setPost((prev) => ({ ...prev, upvote: prev.upvote - 1 }))
        setIsLiked(false)
      }
    } else {
      setPost((prev) => ({ ...prev, downvote: prev.downvote - 1 }))
      setIsDisliked(false)
    }
  }

  const handleShare = () => {
    // Implement actual share functionality here
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    // Implement actual bookmark functionality here
  }

  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-col items-start px-6 pt-6 pb-0'>
        <div className='flex justify-between w-full mb-4'>
          <div className='flex items-center'>
            <Avatar
              src={postData?.author.profileImage}
              alt={postData?.author.name}
              className='mr-4'
            />
            <div>
              <p className='font-semibold text-lg'>{postData?.author.name}</p>
              <p className='text-sm text-default-500'>
                {format(new Date(postData?.createdAt!), 'MMM dd, yyyy')}
              </p>
            </div>
          </div>
          <Button
            size='sm'
            variant='light'
            onClick={handleBookmark}
            className={isBookmarked ? 'text-primary' : 'text-default-500'}>
            <Bookmark className='w-5 h-5' />
          </Button>
        </div>
        <h1 className='text-3xl font-bold mb-2'>{postData?.title}</h1>
        <p className='text-xl text-default-700 dark:text-default-400 mb-4'>
          {postData?.content}
        </p>
        <div className='flex items-center mb-2'>
          <MapPin className='w-5 h-5 text-default-500 mr-2' />
          <span className='text-default-600'>{postData?.location}</span>
        </div>
        <div className='flex flex-wrap gap-2 mb-4'>
          <span className='bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full'>
            {postData?.category}
          </span>
          {postData?.isPremium && (
            <span className='bg-warning/10 text-warning text-sm font-medium px-3 py-1 rounded-full'>
              Premium
            </span>
          )}
        </div>
      </CardHeader>
      <Divider />
      <CardBody className='px-6 py-4'>
        {postData?.images && (
          <DetailPageImageGallery images={postData?.images} />
        )}
        <div
          className='mt-6 prose dark:prose-invert max-w-none'
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </CardBody>
      <Divider />
      <CardFooter className='px-6 py-4'>
        <div className='flex justify-between items-center w-full'>
          <div className='flex space-x-4'>
            <Button
              size='sm'
              color={isLiked ? 'primary' : 'default'}
              variant='flat'
              onClick={handleUpvote}>
              <ThumbsUp className='w-5 h-5 mr-2' />
              <span>{post.upvote}</span>
            </Button>
            <Button
              size='sm'
              color={isDisliked ? 'danger' : 'default'}
              variant='flat'
              onClick={handleDownvote}>
              <ThumbsDown className='w-5 h-5 mr-2' />
              <span>{post.downvote}</span>
            </Button>
          </div>
          <Button size='sm' variant='flat' onClick={handleShare}>
            <Share2 className='w-5 h-5 mr-2' />
            <span>Share</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default PostDetailsCard
