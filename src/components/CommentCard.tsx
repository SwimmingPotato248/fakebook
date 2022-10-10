import { Comment as CommentType } from "@prisma/client";
import Comment from "./Comment";

export default function CommentCard({
  comment,
  comments,
  refetch,
}: {
  comment: CommentType;
  comments: CommentType[];
  refetch: () => void;
}) {
  return (
    <div className="ml-2 border border-black">
      <Comment comment={comment} comments={comments} refetch={refetch} />
    </div>
  );
}
