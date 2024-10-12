'use client'

import Loading from '../../ui/Loading'
import { IPost } from '@/src/types/post.type'
import PostCard from '../../ui/post'
import { useGetCurrentUserQuery } from '@/src/redux/features/auth/authApi'

const MyBookmark = () => {
  const { data: currentUser, isLoading: currentUserLoading } =
    useGetCurrentUserQuery({})

  const bookmarkedPosts = currentUser?.data?.bookmarkPosts
  console.log('🚀 ~ MyBookmark ~ bookmarkedPosts:', bookmarkedPosts)

  return (
    <div>
      {currentUserLoading && <Loading />}

      <div className='flex flex-col gap-6 my-6'>
        {bookmarkedPosts?.length === 0 ? (
          <div className='text-center py-10'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
              You haven't posted anything yet!
            </h2>
            <p className='text-gray-800 dark:text-gray-200 mt-2'>
              Create your first post to share with others.
            </p>
          </div>
        ) : (
          bookmarkedPosts?.map((post: IPost) => (
            <PostCard key={post?._id} post={post} />
          ))
        )}
      </div>
    </div>
  )
}

export default MyBookmark
