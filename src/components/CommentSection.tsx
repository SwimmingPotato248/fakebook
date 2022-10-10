import { trpc } from "../utils/trpc";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import Loading from "./Loading";

export default function CommentSection({ postId }: { postId: number }) {
  const {
    data: comments,
    isError,
    isLoading,
    refetch,
  } = trpc.useQuery(["comment.get", { postId }]);
  if (isLoading) return <Loading />;
  if (isError || !comments) return <div>Error...</div>;

  return (
    <>
      <div className="text-lg text-red-600">Comments ({comments.length})</div>
      <CommentForm postId={postId} refetch={refetch} />
      {comments
        .filter(comment => comment.commentId === null)
        .map(comment => {
          return (
            <CommentCard
              key={comment.id}
              comment={comment}
              comments={comments}
              refetch={refetch}
            />
          );
        })}
    </>
  );
}
