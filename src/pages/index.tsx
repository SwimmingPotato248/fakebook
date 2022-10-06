import type { NextPage } from "next";
import Head from "next/head";
import PostForm from "../components/PostForm";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data, isLoading, isError } = trpc.useQuery(["post.all"]);
  return (
    <>
      <Head>
        <title>Homepage</title>
      </Head>
      <PostForm />
      <div className="mt-4 flex flex-col items-center justify-center">
        {isLoading ? (
          "Loading..."
        ) : isError ? (
          "Something went wrong!"
        ) : (
          <>
            {data?.map(post => {
              return <div key={post.id}>{post.content}</div>;
            })}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
