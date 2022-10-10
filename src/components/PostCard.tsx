import { trpc } from "../utils/trpc";
import CommentSection from "./CommentSection";
import Loading from "./Loading";

export default function PostCard({ postId }: { postId: number }) {
  const {
    data: post,
    isError,
    isLoading,
  } = trpc.useQuery(["post.byId", { postId }]);
  if (isLoading) return <Loading />;
  if (isError || !post) return <div>Error...</div>;

  return (
    <div className="my-2 w-2/3 max-w-lg rounded-md bg-stone-300 p-2 ">
      <h1 className="text-lg">{post.user.name}</h1>
      <p className="text-xs">{post.createdAt.toLocaleString()}</p>
      <p className="my-2">{post.content}</p>
      <CommentSection postId={post.id} />
    </div>
  );
}
