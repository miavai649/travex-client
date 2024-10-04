import Container from '@/src/components/ui/Container'
import PostCard from '@/src/components/ui/post'
import { IPost } from '@/src/types/post.type'

const page = async () => {
  const fetchOptions = {
    next: {
      tags: ['posts']
    }
  }

  const res = await fetch('http://localhost:5000/api/post', fetchOptions)

  const { data: postData } = await res.json()

  return (
    <Container>
      <div className='flex flex-col gap-4'>
        {postData?.map((post: IPost) => (
          <PostCard key={post?._id} post={post} />
        ))}
      </div>
    </Container>
  )
}

export default page
