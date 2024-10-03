import Container from '@/src/components/ui/Container'
import PostCard from '@/src/components/ui/post'

const page = async () => {
  const fetchOptions = {
    next: {
      tags: ['posts']
    }
  }

  const res = await fetch('http://localhost:5000/api/post', fetchOptions)

  const data = await res.json()

  return (
    <Container>
      <PostCard />
    </Container>
  )
}

export default page
