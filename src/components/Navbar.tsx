import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="mb-4 flex justify-between bg-neutral-900 px-4 py-2 text-neutral-100">
      <Link href={"/"}>Fakebook</Link>
      <div className="flex gap-2">
        {session ? (
          <>
            <Link href="/users/profile">
              <button>{session.user?.name}</button>
            </Link>
            <button onClick={() => signOut({ callbackUrl: "/" })}>
              Sign Out
            </button>
          </>
        ) : (
          <button onClick={() => signIn("google", { callbackUrl: "/" })}>
            Login with Google
          </button>
        )}
      </div>
    </nav>
  );
}
