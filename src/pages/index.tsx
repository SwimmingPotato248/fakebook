import type { NextPage } from "next";
import Head from "next/head";
import Loading from "../components/Loading";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const {
    data: posts,
    isLoading,
    isError,
    refetch,
  } = trpc.useQuery(["post.all"]);
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
            {posts?.map(post => {
              return (
                <>
                  <PostCard key={post.id} post={post} />
                </>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
