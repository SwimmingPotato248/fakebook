import Head from "next/head";
import Loading from "@/src/components/Loading";
import ProfileForm from "@/src/components/ProfileForm";
import { trpc } from "@/src/utils/trpc";

const EditProfile = () => {
  const { data, isLoading, isError } = trpc.useQuery(["profile.me"]);
  if (isLoading) return <Loading />;
  if (isError) return <div>Error...</div>;
  return (
    <>
      <Head>
        <title key={"title"}>Edit profile</title>
      </Head>
      <ProfileForm defautValues={{ ...data }} edit={true} />;
    </>
  );
};

export default EditProfile;
