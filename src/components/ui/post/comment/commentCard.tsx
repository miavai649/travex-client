'use client'

import { TComment } from '@/src/types/comment.type'
import { Avatar } from '@nextui-org/avatar'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/dropdown'
import { Button } from '@nextui-org/button'
import { format } from 'date-fns'
import { MoreVertical, Edit2, Trash2 } from 'lucide-react'
import { useAppSelector } from '@/src/redux/hook'
import { useCurrentUser } from '@/src/redux/features/auth/authSlice'
import { useDeleteCommentMutation } from '@/src/redux/features/comment/commentApi'
import { TResponse } from '@/src/types'
import { toast } from 'sonner'

interface IProps {
  comment: TComment
}

const CommentCard = ({ comment }: IProps) => {
  const user = useAppSelector(useCurrentUser)

  // delete comment rtk query
  const [deleteComment] = useDeleteCommentMutation()

  const handleEditComment = (commentId: string) => {
    // Implement edit logic here
    console.log('Editing comment:', commentId)
  }

  const handleDeleteComment = async (commentId: string) => {
    const toastId = toast.loading('Deleting comment...')

    try {
      const res = (await deleteComment(commentId)) as TResponse<TComment>

      if (res.error) {
        toast.error(res.error.data.message, {
          duration: 2000,
          id: toastId
        })
      } else {
        toast.success('Comment deleted successfully', {
          duration: 2000,
          id: toastId
        })
      }
    } catch (error) {
      toast.error('Something went wrong', { duration: 2000 })
    }
  }

  return (
    <div className='flex items-start'>
      <Avatar
        src={comment.commenter.profileImage}
        alt={comment.commenter.name}
        className='mr-4'
        size='md'
      />
      <div className='flex-grow'>
        <div className='flex justify-between items-center mb-2'>
          <p className='font-semibold text-lg'>{comment.commenter.name}</p>
          <div className='flex items-center'>
            <p className='text-sm text-default-500 mr-2'>
              {format(new Date(comment.createdAt), 'MMM dd, yyyy HH:mm')}
            </p>
            {user?._id.toString() === comment?.commenter?._id?.toString() && (
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size='sm' variant='light'>
                    <MoreVertical className='w-4 h-4' />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label='Comment actions'>
                  <DropdownItem
                    key='edit'
                    startContent={<Edit2 className='w-4 h-4' />}
                    onPress={() => handleEditComment(comment._id)}>
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    key='delete'
                    className='text-danger'
                    color='danger'
                    startContent={<Trash2 className='w-4 h-4' />}
                    onPress={() => handleDeleteComment(comment._id)}>
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </div>
        </div>
        <p className='text-default-700 dark:text-default-300 text-base leading-relaxed'>
          {comment.comment}
        </p>
      </div>
    </div>
  )
}

export default CommentCard
