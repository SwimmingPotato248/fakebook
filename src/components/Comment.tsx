import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faReply,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Comment as CommentType, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";
import { trpc } from "../utils/trpc";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

export default function Comment({
  comment,
  comments,
  refetch,
  collapsed,
}: {
  comment: CommentType & { user: User; likedBy: User[] };
  comments: (CommentType & { user: User; likedBy: User[] })[];
  refetch: () => void;
  collapsed: boolean;
}) {
  const { mutate } = trpc.useMutation(["comment.like"], {
    onSuccess: () => {
      refetch();
    },
  });
  const childrenComments = useMemo(() => {
    return comments.filter(c => c.commentId === comment.id);
  }, [comments, comment]);
  const [reply, setReply] = useState(false);
  const closeReply = () => setReply(false);
  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(comment.likedBy.findIndex(u => u.id === session?.user?.id) !== -1);
  }, [comment, session]);

  function handleLike() {
    mutate({ commentId: comment.id, like: !liked });
    setLiked(!liked);
  }

  return (
    <>
      <div className="text-lg text-red-600">{comment.user.name}</div>
      {!collapsed && (
        <>
          <div>{comment.content}</div>
          <div className="flex gap-2">
            <button
              className="rounded p-1 text-xs"
              onClick={() => setReply(!reply)}
            >
              <FontAwesomeIcon icon={faReply} />
            </button>
            <button onClick={handleLike}>
              {liked ? (
                <FontAwesomeIcon icon={faHeartSolid} color="red" />
              ) : (
                <FontAwesomeIcon icon={faHeart} />
              )}
            </button>{" "}
            {comment.likedBy.length}
          </div>
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
      )}
    </>
  );
}
