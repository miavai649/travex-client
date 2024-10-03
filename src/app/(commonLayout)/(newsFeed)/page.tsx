import { useGetAllPost } from '@/src/hook/post.hook'

const page = () => {
  const { data: postData } = useGetAllPost()
  console.log('🚀 ~ page ~ postData:', postData)

  return (
    <div>
      <h1>This is news feed page</h1>
    </div>
  )
}

export default page
