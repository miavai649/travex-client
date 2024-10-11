'use client'
import { useGetCurrentUserPostQuery } from '@/src/redux/features/post/postApi'
import { IPost } from '@/src/types/post.type'
import PostCard from '../../ui/post'
import Loading from '../../ui/Loading'

const MyPost = () => {
  const { data: postData, isLoading: postDataLoading } =
    useGetCurrentUserPostQuery({})

  return (
    <div>
      {postDataLoading && <Loading />}
      <div className='flex flex-col gap-6 my-6'>
        {postData?.data?.map((post: IPost) => (
          <PostCard key={post?._id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default MyPost
