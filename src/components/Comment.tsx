import { Comment as CommentType } from "@prisma/client";
import React, { useMemo, useState } from "react";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

export default function Comment({
  comment,
  comments,
  refetch,
}: {
  comment: CommentType;
  comments: CommentType[];
  refetch: () => void;
}) {
  const childrenComments = useMemo(() => {
    return comments.filter(c => c.commentId === comment.id);
  }, [comments, comment]);
  const [reply, setReply] = useState(false);
  const closeReply = () => setReply(false);

  return (
    <>
      <div>{comment.content}</div>
      <button
        className="rounded bg-gray-600 p-1"
        onClick={() => setReply(!reply)}
      >
        Reply
      </button>
      {reply && (
        <CommentForm
          postId={comment.postId}
          commentId={comment.id}
          refetch={refetch}
          close={closeReply}
        />
      )}
      {childrenComments.length !== 0 &&
        childrenComments.map(c => {
          return (
            <CommentCard
              key={c.id}
              comment={c}
              comments={comments}
              refetch={refetch}
            />
          );
        })}
    </>
  );
}
