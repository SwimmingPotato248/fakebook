import { useRef, useState } from "react";
import { trpc } from "../utils/trpc";

export default function CommentForm({
  postId,
  commentId,
  refetch,
  close,
}: {
  postId: number;
  commentId?: number;
  refetch: () => void;
  close?: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const { mutate } = trpc.useMutation(["comment.create"], {
    onSuccess() {
      if (commentRef.current) commentRef.current.value = "";
      if (close) close();
      setIsSubmitting(false);
      refetch();
    },
  });
  return (
    <form
      className="flex flex-col"
      onSubmit={e => {
        e.preventDefault();
        if (!commentRef.current || !commentRef.current.value) return;
        setIsSubmitting(true);
        mutate({
          content: commentRef.current.value,
          postId,
          parentId: commentId,
        });
      }}
    >
      <textarea
        className="resize-none rounded-t-lg px-1 focus:outline-none"
        ref={commentRef}
        placeholder="Comment something..."
      />
      <input
        type="submit"
        value="Comment"
        className="cursor-pointer rounded-b-lg bg-blue-400 py-1 disabled:cursor-not-allowed disabled:bg-gray-400"
        disabled={isSubmitting}
      />
    </form>
  );
}
