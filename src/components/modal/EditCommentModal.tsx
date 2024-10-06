import { FieldValues, SubmitHandler } from 'react-hook-form'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@nextui-org/modal'
import TForm from '../form/TForm'
import TInput from '../form/TInput'
import { Button } from '@nextui-org/button'
import { Spinner } from '@nextui-org/spinner'

interface EditCommentModalProps {
  isOpen: boolean
  onClose: () => void
  commentId: string
}

const EditCommentModal = ({
  isOpen,
  onClose,
  commentId
}: EditCommentModalProps) => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log('Updated comment:', data)
    onClose()
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
              <TForm onSubmit={onSubmit}>
                <TInput name='comment' label='New Comment' />
                <div className='mt-4 flex-1 w-2/6'>
                  <Button
                    // isLoading
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
