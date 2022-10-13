import { signIn, useSession } from "next-auth/react";
import Image from "next/future/image";
import { useRouter } from "next/router";
import Loading from "../components/Loading";
import { trpc } from "../utils/trpc";

export default function Profile() {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session?.user || !session.user.id)
    return signIn("google", { callbackUrl: "/profile" });
  const { data, isLoading } = trpc.useQuery(
    ["profile.me", { userId: session.user.id }],
    {
      onError(e) {
        if (e.data?.code === "NOT_FOUND") router.push("/profile/create");
      },
      onSuccess() {
        if (!data) router.push("/profile/create");
      },
    }
  );
  console.log(data);
  if (isLoading) return <Loading />;

  return (
    <>
      <div>{data?.fName + " " + data?.lName}</div>
      <div>{data?.bio}</div>
      {data?.image && (
        <Image src={data.image} width={100} height={100} alt="Avatar" />
      )}
    </>
  );
}
