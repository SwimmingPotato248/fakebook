import Head from "next/head";
import ProfileForm from "@/src/components/ProfileForm";

export default function CreateProfile() {
  return (
    <>
      <Head>
        <title key={"title"}>Create profile</title>
      </Head>
      <ProfileForm />;
    </>
  );
}
