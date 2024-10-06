'use client'
import { TComment } from '@/src/types/comment.type'
import { Button } from '@nextui-org/button'
import { MessageCircle, Send } from 'lucide-react'
import CommentCard from './CommentCard'
import TForm from '@/src/components/form/TForm'
import TTextarea from '@/src/components/form/TTextArea'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'
import { useParams } from 'next/navigation'
import { useAddCommentMutation } from '@/src/redux/features/comment/commentApi'
import { TResponse } from '@/src/types'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { commentValidationSchema } from '@/src/schemas/comment.schema'
import { Spinner } from '@nextui-org/spinner'

interface IProps {
  commentData: TComment[]
}

const Comment = ({ commentData }: IProps) => {
  const { postId } = useParams()

  const [addComment, { isLoading }] = useAddCommentMutation()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const comment = {
      post: postId,
      ...data
    }

    try {
      const res = (await addComment(comment)) as TResponse<TComment>

      if (res.error) {
        toast.error(res.error.data.message, {
          duration: 2000
        })
      } else {
        toast.success('Comment posted successfully', {
          duration: 2000
        })
      }
    } catch (error) {
      toast.error('Something went wrong', { duration: 2000 })
    }
  }

  return (
    <Card className='w-full bg-background shadow-md'>
      <CardHeader className='flex flex-col items-start px-6 pt-6 pb-4'>
        <div className='flex items-center w-full mb-4'>
          <MessageCircle className='w-6 h-6 text-primary mr-2' />
          <h2 className='text-2xl font-bold'>
            Comments ({commentData.length})
          </h2>
        </div>
        <div className='w-full'>
          <TForm
            onSubmit={onSubmit}
            resolver={zodResolver(commentValidationSchema)}>
            <TTextarea label='Share your thoughts...' name='comment' />
            <div className='flex justify-end mt-4'>
              <Button
                isLoading={isLoading}
                spinner={<Spinner size='sm' color='default' />}
                type='submit'
                color='primary'
                className='px-6'
                startContent={<Send className='w-4 h-4' />}>
                Send
              </Button>
            </div>
          </TForm>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className='px-6 py-4 overflow-y-auto max-h-[500px]'>
        {commentData.map((comment, index) => (
          <div key={comment._id} className='w-full mb-6 last:mb-0'>
            <CommentCard comment={comment} />
            {index < commentData.length - 1 && <Divider className='my-6' />}
          </div>
        ))}
      </CardBody>
    </Card>
  )
}

export default Comment
