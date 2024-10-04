import { TComment } from '@/src/types/comment.type'
import { Avatar } from '@nextui-org/avatar'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { format } from 'date-fns'
import { Send } from 'lucide-react'
import { useState } from 'react'
import CommentCard from './CommentCard'

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
  commentData: TComment[] | []
}

const Comment = ({ commentData }: IProps) => {
  const [comments, setComments] = useState(dummyComments)
  const [newComment, setNewComment] = useState('')

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

  return (
    <section className='bg-background shadow-lg rounded-lg overflow-hidden'>
      <div className='p-6 sm:p-8'>
        <h2 className='text-2xl font-bold mb-6'>Comments</h2>
        <form onSubmit={handleCommentSubmit} className='flex items-center mb-8'>
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
          {commentData?.map((comment) => <CommentCard comment={comment} />)}
        </div>
      </div>
    </section>
  )
}

export default Comment
