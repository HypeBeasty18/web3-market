"use client";

import { trpc } from "@/server/utils/trpc";
import { queryClient } from "@/shared/constant/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AuthMenu() {
  const router = useRouter();

  const { mutate: logoutFn } = trpc.logoutUser.useMutation({
    onError(error) {
      toast.error(error.message);
      console.log("Error message:", error.message);
    },
    onSuccess() {
      queryClient.clear();
      toast.success("logout successful");
      router.push("/login");
    },
  });

  return (
    <>
      <li>
        <Link href="/profile" className="text-ct-dark-600">
          Profile
        </Link>
      </li>
      <li className="cursor-pointer" onClick={() => logoutFn()}>
        Logout
      </li>
    </>
  );
}
