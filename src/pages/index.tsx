import type { NextPage } from "next";
import Head from "next/head";
import Loading from "../components/Loading";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = trpc.useInfiniteQuery(["post.all", { limit: 5 }]);
  console.log(data);
  return (
    <>
      <Head>
        <title>Homepage</title>
      </Head>
      <PostForm refetch={refetch} />
      <div className="mt-4 flex flex-col items-center justify-center">
        {isLoading ? (
          <Loading />
        ) : isError ? (
          "Something went wrong!"
        ) : (
          <>
            {data?.pages.map(group =>
              group.posts.map(post => {
                return (
                  <>
                    <PostCard key={post.id} postId={post.id} />
                  </>
                );
              })
            )}
          </>
        )}
      </div>
      <button
        onClick={() => fetchNextPage()}
        className="mx-auto block rounded-lg bg-blue-600 px-4 disabled:cursor-not-allowed disabled:bg-gray-500"
        disabled={!hasNextPage || isFetching}
      >
        {hasNextPage || isFetching ? "Read more..." : "No more posts"}
      </button>
    </>
  );
};

export default Home;
