import { useRouter } from "next/router";

export default function UserInfoPage() {
  const router = useRouter();
  console.log(router.query);

  return <div>{router.query.id}</div>;
}
