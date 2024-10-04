import { TComment } from '@/src/types/comment.type'
import { Avatar } from '@nextui-org/avatar'
import { format } from 'date-fns'

interface IProps {
  comment: TComment
}
const CommentCard = ({ comment }: IProps) => {
  return (
    <div key={comment?._id} className='flex items-start'>
      <Avatar
        src={comment?.commenter?.profileImage}
        alt={comment?.commenter?.name}
        className='mr-4'
      />
      <div>
        <p className='font-semibold'>{comment?.commenter?.name}</p>
        <p className='text-sm text-default-500 mb-2'>
          {format(new Date(comment?.createdAt), 'MMM dd, yyyy HH:mm')}
        </p>
        <p className='text-default-700 dark:text-default-400'>
          {comment?.comment}
        </p>
      </div>
    </div>
  )
}

export default CommentCard
