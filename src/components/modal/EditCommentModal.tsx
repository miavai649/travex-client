import { FieldValues, SubmitHandler } from 'react-hook-form'
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/modal'
import TForm from '../form/TForm'
import TInput from '../form/TInput'
import { Button } from '@nextui-org/button'
import { Spinner } from '@nextui-org/spinner'
import { useUpdateCommentMutation } from '@/src/redux/features/comment/commentApi'
import { TResponse } from '@/src/types'
import { TComment } from '@/src/types/comment.type'
import { toast } from 'sonner'

interface IProps {
  isOpen: boolean
  onClose: () => void
  commentId: string
  comment: string
}

const EditCommentModal = ({ isOpen, onClose, commentId, comment }: IProps) => {
  // update comment rtk query
  const [updateComment, { isLoading: updateCommentLoading }] =
    useUpdateCommentMutation()

  const commentUpdateDefaultValue = {
    comment: comment
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const updateCommentData = {
      data: {
        ...data
      },
      commentId
    }
    console.log(
      '🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ updateCommentData:',
      updateCommentData
    )

    try {
      const res = (await updateComment(
        updateCommentData
      )) as TResponse<TComment>

      if (res.error) {
        toast.error(res.error.data.message, {
          duration: 2000
        })
      } else {
        toast.success('Comment updated successfully', {
          duration: 2000
        })
      }
    } catch (error) {
      toast.error('Something went wrong', { duration: 2000 })
    } finally {
      onClose()
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      placement='center'
      backdrop={'blur'}
      classNames={{
        base: 'bg-background',
        header: 'border-b border-divider',
        footer: 'border-t border-divider',
        closeButton: 'hover:bg-default-100 active:bg-default-200'
      }}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              <h2 className='text-xl font-bold'>Edit Comment</h2>
            </ModalHeader>
            <ModalBody className='my-8'>
              <TForm
                onSubmit={onSubmit}
                defaultValues={commentUpdateDefaultValue}>
                <TInput name='comment' label='New Comment' />
                <div className='mt-4 flex-1 w-2/6'>
                  <Button
                    isLoading={updateCommentLoading}
                    spinner={<Spinner size='sm' color='current' />}
                    color='primary'
                    size='md'
                    type='submit'
                    className='w-full'>
                    Update
                  </Button>
                </div>
              </TForm>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default EditCommentModal
