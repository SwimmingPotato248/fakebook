import { signIn } from "next-auth/react";
import Image from "next/future/image";
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
    <>
      {data === null ? (
        <div>
          No profile created yet. Click{" "}
          <Link href={"/profile/create"}>here</Link> to create one.
        </div>
      ) : (
        <>
          <div>{data?.fName + " " + data?.lName}</div>
          <div>{data?.bio}</div>
          {data?.image && (
            <Image src={data.image} width={100} height={100} alt="Avatar" />
          )}
        </>
      )}
    </>
  );
}
