import { signIn } from "next-auth/react";
import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import Loading from "../../components/Loading";
import { trpc } from "../../utils/trpc";

export default function Profile() {
  const { data, isLoading, isError } = trpc.useQuery(["profile.me"], {
    onError: error => {
      if (error.data?.code === "UNAUTHORIZED")
        signIn("google", { callbackUrl: "/profile" });
    },
  });
  if (isLoading) return <Loading />;
  if (isError) return <div>Error...</div>;
  return (
    <div className="mx-auto flex max-w-lg flex-col gap-2">
      <Head>
        <title key={"title"}>Profile</title>
      </Head>
      {data === null ? (
        <div>
          No profile created yet. Click{" "}
          <Link href={"/profile/create"}>here</Link> to create one.
        </div>
      ) : (
        <>
          <div className="flex gap-2">
            <Image
              src={data?.image || "/avatar-placeholder.webp"}
              width={100}
              height={100}
              alt="Avatar"
            />
            <div className="grow">
              <div>{data?.fName + " " + data?.lName}</div>
              <div>{data?.dateOfBirth.toLocaleDateString()}</div>
              <div>{data?.bio}</div>
            </div>
          </div>
          <Link href={"/profile/edit"}>
            <button className="rounded-lg bg-blue-500 p-1">
              Edit this profile
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
