"use client";
import PostCard from ".";

import { useGetAllPostQuery } from "@/src/redux/features/post/postApi";
import { IPost } from "@/src/types/post.type";

const AllPost = () => {
  const { data: postData } = useGetAllPostQuery({});

  return (
    <div className="flex flex-col gap-6 my-6">
      {postData?.data?.map((post: IPost) => (
        <PostCard key={post?._id} post={post} />
      ))}
    </div>
  );
};

export default AllPost;
