import { signIn } from "next-auth/react";
import { useRef, useState } from "react";
import { trpc } from "../utils/trpc";

export default function PostForm({ refetch }: { refetch: () => void }) {
  const [btnDisable, setBtnDisable] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const { mutate } = trpc.useMutation(["post.create"], {
    onSuccess() {
      if (contentRef.current) contentRef.current.value = "";
      refetch();
      setBtnDisable(false);
    },
    onError(err) {
      if (err.data?.code === "UNAUTHORIZED")
        signIn("google", { callbackUrl: "/" });
    },
  });
  return (
    <form
      className="mx-auto flex flex-col justify-center"
      onSubmit={e => {
        e.preventDefault();
        setBtnDisable(true);
        if (!contentRef.current) return;
        mutate({
          content: contentRef.current.value,
        });
      }}
    >
      <textarea
        className="h-40 w-full resize-none overflow-auto rounded-t-lg p-2 focus:outline-none"
        placeholder="Post something..."
        ref={contentRef}
        required
      />
      <input
        type="submit"
        value="Post"
        className="cursor-pointer rounded-b-lg bg-blue-400 py-2 disabled:cursor-not-allowed disabled:bg-gray-500"
        disabled={btnDisable}
      />
    </form>
  );
}
