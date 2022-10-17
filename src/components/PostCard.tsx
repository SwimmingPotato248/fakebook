import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import CommentSection from "./CommentSection";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faHeartSolid,
  faBookmark as faBookmarkSolid,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function PostCard({ postId }: { postId: number }) {
  const { data: session } = useSession();
  const {
    data: post,
    isError,
    isLoading,
    refetch,
  } = trpc.useQuery(["post.byId", { postId }]);
  const { mutate: mutateLike } = trpc.useMutation(["post.like"], {
    onSuccess() {
      refetch();
    },
  });
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    setLiked(
      post?.likedBy.findIndex(user => user.id === session?.user?.id) !== -1
    );
  }, [post, session]);

  const { mutate: mutateSave } = trpc.useMutation(["post.save"], {
    onSuccess: () => refetch(),
  });
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    setSaved(
      post?.savedBy.findIndex(user => user.id === session?.user?.id) !== -1
    );
  }, [post, session]);

  if (isLoading) return <Loading />;
  if (isError || !post) return <div>Error...</div>;

  console.log(saved);

  return (
    <div className="my-2 w-full rounded-md bg-stone-300 p-2 ">
      <h1 className="text-xl">{post.user.name}</h1>
      <p className="text-xs">{post.createdAt.toLocaleString()}</p>
      <p className="my-2">{post.content}</p>
      <div className="flex gap-4">
        <div className="flex gap-1">
          <button
            onClick={() => {
              setLiked(!liked);
              mutateLike({ postId: post.id, like: !liked });
            }}
          >
            {liked ? (
              <FontAwesomeIcon icon={faHeartSolid} color="red" />
            ) : (
              <FontAwesomeIcon icon={faHeart} />
            )}
          </button>
          {post.likedBy.length}
        </div>
        <button
          onClick={() => {
            mutateSave({ postId: postId, save: !saved });
            setSaved(!saved);
          }}
        >
          {saved ? (
            <FontAwesomeIcon icon={faBookmarkSolid} color="rebeccapurple" />
          ) : (
            <FontAwesomeIcon icon={faBookmark} />
          )}
        </button>
      </div>
      <CommentSection postId={post.id} />
    </div>
  );
}
