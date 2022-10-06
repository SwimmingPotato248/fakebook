import { useRouter } from "next/router";
import { useRef } from "react";
import { trpc } from "../utils/trpc";

export default function PostForm() {
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const { mutate } = trpc.useMutation(["post.create"], {
    onSuccess() {
      router.reload();
    },
  });
  return (
    <form
      className="mx-auto flex w-2/3 max-w-md flex-col justify-center"
      onSubmit={e => {
        e.preventDefault();
        if (!contentRef.current) return;
        mutate({
          content: contentRef.current.value,
        });
      }}
    >
      <textarea
        className="h-40 w-full resize-none overflow-auto rounded-t-lg p-2"
        placeholder="Post something..."
        ref={contentRef}
        required
      />
      <input
        type="submit"
        value="Post"
        className="cursor-pointer rounded-b-lg bg-blue-400 py-2"
      />
    </form>
  );
}
