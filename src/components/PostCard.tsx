import { Post, User } from "@prisma/client";
export default function PostCard({ post }: { post: Post & { user: User } }) {
  return (
    <div className="my-2 w-2/3 max-w-lg rounded-md bg-stone-300 p-2 ">
      <h1 className="text-lg">{post.user.name}</h1>
      <p className="text-xs">{post.createdAt.toLocaleString()}</p>
      <p>{post.content}</p>
    </div>
  );
}
