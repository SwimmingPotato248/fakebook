import { ReactNode } from "react";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full md:w-1/3">{children}</main>
    </>
  );
}
