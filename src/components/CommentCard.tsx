import { Comment as CommentType, User } from "@prisma/client";
import Comment from "./Comment";

export default function CommentCard({
  comment,
  comments,
  refetch,
}: {
  comment: CommentType & { user: User };
  comments: (CommentType & { user: User })[];
  refetch: () => void;
}) {
  return (
    <div className="ml-2 border border-black px-1">
      <Comment comment={comment} comments={comments} refetch={refetch} />
    </div>
  );
}
