"use client";

import { headerUrls } from "@/shared/constant/urls";
import Link from "next/link";

export const AuthHeader = () => {
  return (
    <div className="flex gap-5">
      {headerUrls.map((url) => (
        <button key={url.url} className="text-black hover:underline ">
          <Link href={url.url}>{url.name}</Link>
        </button>
      ))}
    </div>
  );
};
