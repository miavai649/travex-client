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

// Dummy data for comments (unchanged)
const dummyComments = [
  {
    id: '1',
    author: 'John Doe',
    content: 'Great post! I loved my trip to Bali.',
    createdAt: '2024-03-16T08:30:00Z',
    profileImage: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: '2',
    author: 'Alice Smith',
    content: 'Thanks for sharing these hidden gems!',
    createdAt: '2024-03-16T09:15:00Z',
    profileImage: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: '3',
    author: 'Bob Johnson',
    content: "I can't wait to visit Bali after reading this!",
    createdAt: '2024-03-16T10:00:00Z',
    profileImage: 'https://i.pravatar.cc/150?img=4'
  }
]

interface IProps {
  params: {
    postId: string
  }
}

export default function PostDetails({ params }: IProps) {
  const [post, setPost] = useState(dummyPost)
  const [comments, setComments] = useState(dummyComments)
  const [newComment, setNewComment] = useState('')
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
    console.log('Sharing post:', post._id)
    // Implement actual share functionality here
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    // Implement actual bookmark functionality here
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      const comment = {
        id: String(comments.length + 1),
        author: 'Current User',
        content: newComment,
        createdAt: new Date().toISOString(),
        profileImage: 'https://i.pravatar.cc/150?img=5'
      }
      setComments((prev) => [comment, ...prev])
      setNewComment('')
    }
  }

  const { data: postData, isLoading } = useGetSinglePostQuery(params.postId)
  console.log('🚀 ~ PostDetails ~ postData:', postData?.data?.createdAt)

  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      {isLoading ? (
        <Loading />
      ) : (
        <article className='bg-background shadow-lg rounded-lg overflow-hidden'>
          <div className='p-6 sm:p-8'>
            <header className='mb-8'>
              <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center'>
                  <Avatar
                    src={postData?.data?.author.profileImage}
                    alt={postData?.data?.author.name}
                    className='mr-4'
                  />
                  <div>
                    <p className='font-semibold text-lg'>
                      {postData?.data?.author.name}
                    </p>
                    <p className='text-sm text-default-500'>
                      {format(
                        new Date(postData?.data?.createdAt!),
                        'MMM dd, yyyy'
                      )}
                    </p>
                  </div>
                </div>
                <Button
                  size='sm'
                  variant='light'
                  onClick={handleBookmark}
                  className={
                    isBookmarked ? 'text-primary' : 'text-default-500'
                  }>
                  <Bookmark className='w-5 h-5' />
                </Button>
              </div>
              <h1 className='text-4xl font-bold mb-4'>
                {postData?.data?.title}
              </h1>
              <p className='text-xl text-default-700 dark:text-default-400 mb-4'>
                {postData?.data?.content}
              </p>
              <div className='flex items-center mb-4'>
                <MapPin className='w-5 h-5 text-default-500 mr-2' />
                <span className='text-default-600'>
                  {postData?.data?.location}
                </span>
              </div>
              <div className='flex flex-wrap gap-2'>
                <span className='bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full'>
                  {postData?.data?.category}
                </span>
                {postData?.data?.isPremium && (
                  <span className='bg-warning/10 text-warning text-sm font-medium px-3 py-1 rounded-full'>
                    Premium
                  </span>
                )}
              </div>
            </header>

            {postData?.data?.images && (
              <DetailPageImageGallery images={postData?.data?.images} />
            )}

            <div
              className='mt-8 prose dark:prose-invert max-w-none'
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          <footer className='bg-default-100 dark:bg-default-50 px-6 py-4 sm:px-8 sm:py-6'>
            <div className='flex justify-between items-center'>
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
          </footer>
        </article>
      )}

      <Divider className='my-8' />

      <section className='bg-background shadow-lg rounded-lg overflow-hidden'>
        <div className='p-6 sm:p-8'>
          <h2 className='text-2xl font-bold mb-6'>Comments</h2>
          <form
            onSubmit={handleCommentSubmit}
            className='flex items-center mb-8'>
            <Input
              type='text'
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder='Add a comment...'
              className='flex-grow mr-4'
            />
            <Button type='submit' color='primary'>
              <Send className='w-5 h-5 mr-2' />
              Post
            </Button>
          </form>
          <div className='space-y-6'>
            {comments.map((comment) => (
              <div key={comment.id} className='flex items-start'>
                <Avatar
                  src={comment.profileImage}
                  alt={comment.author}
                  className='mr-4'
                />
                <div>
                  <p className='font-semibold'>{comment.author}</p>
                  <p className='text-sm text-default-500 mb-2'>
                    {format(new Date(comment.createdAt), 'MMM dd, yyyy HH:mm')}
                  </p>
                  <p className='text-default-700 dark:text-default-400'>
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
