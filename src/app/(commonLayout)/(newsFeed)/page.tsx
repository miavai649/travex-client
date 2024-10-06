import Container from '@/src/components/ui/Container'
import PostCard from '@/src/components/ui/post'
import AllPost from '@/src/components/ui/post/AllPost'
import { useGetAllPostQuery } from '@/src/redux/features/post/postApi'
import { IPost } from '@/src/types/post.type'

const page = () => {
  return (
    <Container>
      <AllPost />
    </Container>
  )
}

export default page
