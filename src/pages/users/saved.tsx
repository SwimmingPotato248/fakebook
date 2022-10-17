import Loading from "@/src/components/Loading";
import PostCard from "@/src/components/PostCard";
import { trpc } from "@/src/utils/trpc";

export default function SavedPost() {
  const { data, isLoading, isError } = trpc.useQuery(["user.savedPosts"]);

  if (isLoading) return <Loading />;
  if (isError || !data) return <div>Something went wrong...</div>;

  return (
    <>
      {data.map(post => (
        <PostCard key={post.id} postId={post.id} />
      ))}
    </>
  );
}
