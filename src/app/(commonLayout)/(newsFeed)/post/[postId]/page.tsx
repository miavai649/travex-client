'use client'

import { Divider } from '@nextui-org/divider'
import { Spinner } from '@nextui-org/spinner'

import { useGetSinglePostQuery } from '@/src/redux/features/post/postApi'
import Loading from '@/src/components/ui/Loading'
import PostDetailsCard from '@/src/components/ui/post/PostDetailsCard'
import { useGetMyCommentQuery } from '@/src/redux/features/comment/commentApi'
import Comment from '@/src/components/ui/post/comment'
import { useGetCurrentUserQuery } from '@/src/redux/features/auth/authApi'
import PremiumCard from '@/src/components/ui/PremiumCard'

interface IProps {
  params: {
    postId: string
  }
}

export default function PostDetails({ params }: IProps) {
  const { data: currentUserData } = useGetCurrentUserQuery({})

  // getting single post data
  const { data: postData, isLoading: postLoading } = useGetSinglePostQuery(
    params.postId
  )

  // getting comments for that individual post
  const { data: commentData, isLoading: commentLoading } = useGetMyCommentQuery(
    postData?.data?._id,
    {
      skip: postLoading
    }
  )

  const isPremiumAndNotVerified =
    postData?.data?.isPremium && !currentUserData?.data?.isVerified

  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      {postLoading ? (
        <Loading />
      ) : (
        <div>
          {isPremiumAndNotVerified && <PremiumCard />}
          <PostDetailsCard postData={postData?.data!} />
        </div>
      )}

      <Divider className='my-8' />
      {postLoading || commentLoading ? (
        <div className='h-full w-full flex justify-center items-center'>
          <Spinner size='lg' />
        </div>
      ) : (
        <Comment commentData={commentData?.data!} />
      )}
    </div>
  )
}
