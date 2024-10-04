'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Card, CardBody, CardFooter } from '@nextui-org/card'
import { Avatar } from '@nextui-org/avatar'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Divider } from '@nextui-org/divider'
import { ThumbsUp, ThumbsDown, Share2, MapPin, Send } from 'lucide-react'
import ImageGallery from '@/src/components/ui/post/ImageGallery'
import DetailPageImageGallery from '@/src/components/ui/post/DetailPageImageGallery'
import { useGetSinglePostQuery } from '@/src/redux/features/post/postApi'
import Loading from '@/src/components/ui/Loading'

// Dummy data for the post
const dummyPost = {
  _id: '1',
  title: 'Exploring the Hidden Gems of Bali',
  content:
    'Bali, known for its lush landscapes and vibrant culture, offers more than just popular tourist spots. In this post, we delve into the lesser-known areas that provide a truly authentic experience. From secluded beaches to ancient temples nestled in the jungle, Bali has countless treasures waiting to be discovered. Join me on this journey as we explore the road less traveled and uncover the true essence of this Indonesian paradise.',
  author: {
    _id: '101',
    name: 'Jane Doe',
    profileImage: 'https://i.pravatar.cc/150?img=1'
  },
  images: [
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800',
    'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=800',
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800'
  ],
  category: 'Adventure',
  isPremium: true,
  createdAt: '2024-03-15T10:00:00Z',
  location: 'Bali, Indonesia',
  upvote: 124,
  downvote: 7
}

// Dummy data for comments
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

  return (
    <div>
      {isLoading && <Loading />}
      <div className='max-w-4xl mx-auto p-4'>
        <Card className='w-full'>
          <CardBody className='p-4'>
            {/* author details  */}
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
            <h1 className='text-3xl font-bold mb-4'>{postData?.data?.title}</h1>
            <p className='text-default-700 dark:text-default-400 mb-4'>
              {postData?.data?.content}
            </p>
            <div className='flex items-center mb-4'>
              <MapPin className='w-4 h-4 text-default-500 mr-1' />
              <span className='text-sm text-default-500'>
                {postData?.data?.location}
              </span>
            </div>
            <div className='flex flex-wrap gap-2 mb-4'>
              <span className='bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs font-semibold px-2.5 py-0.5 rounded'>
                {postData?.data?.category}
              </span>
              {/* {postData?.data?.isPremium && (
              <span className='bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 text-xs font-semibold px-2.5 py-0.5 rounded'>
                Premium
              </span>
            )} */}
              <span className='bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 text-xs font-semibold px-2.5 py-0.5 rounded'>
                Premium
              </span>
            </div>

            {/* post images */}
            {postData?.data?.images && (
              <DetailPageImageGallery images={postData?.data?.images} />
            )}
          </CardBody>
          <CardFooter className='flex justify-between items-center px-4 py-3 bg-default-100 dark:bg-default-50'>
            <div className='flex space-x-4'>
              <Button
                size='sm'
                variant='light'
                onClick={handleUpvote}
                className={`${isLiked ? 'text-blue-600' : 'text-default-500'}`}>
                <ThumbsUp className='w-5 h-5' />
                <span>{postData?.data?.upvote}</span>
              </Button>
              <Button
                size='sm'
                variant='light'
                onClick={handleDownvote}
                className={`${isDisliked ? 'text-red-600' : 'text-default-500'}`}>
                <ThumbsDown className='w-5 h-5' />
                <span>{postData?.data?.downvote}</span>
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
        </Card>

        <Divider className='my-6' />

        {/* comment section */}

        <Card className='w-full'>
          <CardBody className='p-4'>
            <h2 className='text-2xl font-bold mb-4'>Comments</h2>
            <form
              onSubmit={handleCommentSubmit}
              className='flex items-center mb-6'>
              <Input
                type='text'
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder='Add a comment...'
                className='flex-grow mr-2'
              />
              <Button type='submit' color='primary' isIconOnly>
                <Send className='w-5 h-5' />
              </Button>
            </form>
            <div className='space-y-4'>
              {comments.map((comment) => (
                <Card key={comment.id} className='w-full'>
                  <CardBody className='p-3'>
                    <div className='flex items-start'>
                      <Avatar
                        src={comment.profileImage}
                        alt={comment.author}
                        className='mr-3'
                      />
                      <div>
                        <p className='font-semibold'>{comment.author}</p>
                        <p className='text-sm text-default-500'>
                          {format(
                            new Date(comment.createdAt),
                            'MMM dd, yyyy HH:mm'
                          )}
                        </p>
                        <p className='mt-1'>{comment.content}</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
