import { Comment as CommentType, User } from "@prisma/client";
import { useState } from "react";
import Comment from "./Comment";

export default function CommentCard({
  comment,
  comments,
  refetch,
}: {
  comment: CommentType & { user: User; likedBy: User[] };
  comments: (CommentType & { user: User; likedBy: User[] })[];
  refetch: () => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="relative ml-2 border border-black px-1">
      <button
        className="absolute right-0 top-0"
        onClick={() => setCollapsed(!collapsed)}
      >
        -
      </button>
      <Comment
        comment={comment}
        comments={comments}
        refetch={refetch}
        collapsed={collapsed}
      />
    </div>
  );
}
