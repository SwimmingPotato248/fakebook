import Head from "next/head";
import ProfileForm from "../../../components/ProfileForm";

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
