'use client'
import CreatePostModal from '@/src/components/modal/CreatePostModal'
import MyPost from '@/src/components/modules/my-post/MyPost'
import Container from '@/src/components/ui/Container'
import { Button } from '@nextui-org/button'
import { Divider } from '@nextui-org/divider'
import { useDisclosure } from '@nextui-org/modal'
import { IoAddCircleOutline } from 'react-icons/io5'

const page = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Container>
      <div className='max-w-3xl w-full mx-auto py-8'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
            Manage Content
          </h1>
          <Button
            color='primary'
            variant='solid'
            onPress={onOpen}
            startContent={<IoAddCircleOutline fontSize={'1.5rem'} />}>
            Create Post
          </Button>
          <CreatePostModal isOpen={isOpen} onClose={onClose} />
        </div>

        <Divider className='my-4' />

        {/* logged in user's post */}
        <div className='p-6 mt-6'>
          <MyPost />
        </div>
      </div>
    </Container>
  )
}

export default page
