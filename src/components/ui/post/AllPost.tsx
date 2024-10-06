'use client'
import { useGetAllPostQuery } from '@/src/redux/features/post/postApi'
import { IPost } from '@/src/types/post.type'
import PostCard from '.'

const AllPost = () => {
  const { data: postData } = useGetAllPostQuery({})

  return (
    <div className='flex flex-col gap-4 my-6'>
      {postData?.data?.map((post: IPost) => (
        <PostCard key={post?._id} post={post} />
      ))}
    </div>
  )
}

export default AllPost
