import CreatePostModal from '@/src/components/modal/CreatePostModal'
import MyPost from '@/src/components/modules/my-post/MyPost'
import Container from '@/src/components/ui/Container'
import { Divider } from '@nextui-org/divider'

const page = () => {
  return (
    <Container>
      <div className='max-w-3xl w-full mx-auto py-8'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
            Manage Content
          </h1>
          <CreatePostModal />
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
