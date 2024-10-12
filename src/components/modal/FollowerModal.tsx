'use client'
import { useGetCurrentUserQuery } from '@/src/redux/features/auth/authApi'
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/modal'

interface IProps {
  isOpen: boolean
  onClose: () => void
}

const FollowerModal = ({ isOpen, onClose }: IProps) => {
  const { data: currentUser, isLoading: currentUserLoading } =
    useGetCurrentUserQuery({})
  console.log('🚀 ~ FollowerModal ~ currentUser:', currentUser)

  return (
    <Modal
      backdrop={'blur'}
      classNames={{
        base: 'bg-background',
        header: 'border-b border-divider',
        footer: 'border-t border-divider',
        closeButton: 'hover:bg-default-100 active:bg-default-200'
      }}
      isOpen={isOpen}
      placement='center'
      onOpenChange={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              <h2 className='text-xl font-bold'>Edit Comment</h2>
            </ModalHeader>
            <ModalBody className='my-8'>
              <h1>Follwer</h1>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default FollowerModal
