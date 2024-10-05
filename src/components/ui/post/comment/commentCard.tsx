import { TComment } from '@/src/types/comment.type'
import { Avatar } from '@nextui-org/avatar'
import { format } from 'date-fns'

interface IProps {
  comment: TComment
}
const CommentCard = ({ comment }: IProps) => {
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
          <p className='text-sm text-default-500'>
            {format(new Date(comment.createdAt), 'MMM dd, yyyy HH:mm')}
          </p>
        </div>
        <p className='text-default-700 dark:text-default-300 text-base leading-relaxed'>
          {comment.comment}
        </p>
      </div>
    </div>
  )
}

export default CommentCard
