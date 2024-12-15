"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { HeaderMenu } from "./header-menu";
export const UserHeader = () => {
  const handleOpenNotification = () => {};

  return (
    <div className="flex items-center w-[100px]">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <HeaderMenu />
        </DropdownMenuTrigger>
      </DropdownMenu>
      <button onClick={handleOpenNotification} className="flex h-full items-center mt-1">
        <Badge className="" count={6}>
          <Bell size={28} />
        </Badge>
      </button>
    </div>
  );
};
