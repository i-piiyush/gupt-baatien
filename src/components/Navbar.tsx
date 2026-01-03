"use Client";

import { User } from "next-auth";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  console.log(user)

  

  return (
    <nav className="w-full px-10 py-3 flex justify-between items-center">
      <h1 className="text-xl tracking-tighter font-bold">Gupt Baatien.</h1>
      {session ? (
        <Button className="cursor-pointer"
          onClick={() => {
            signOut();
          }}
        >
          Log Out
        </Button>
      ) : (
        <Button className="cursor-pointer">
          <Link href="/sign-in">Sign In</Link>
        </Button>
      )}
    </nav>
  );
};

export default Navbar;
