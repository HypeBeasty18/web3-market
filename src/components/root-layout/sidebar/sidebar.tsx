"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { layoutIcons } from "../constants/icons";

import { sidebarUrls } from "@/shared/constant/urls";
import { observer } from "mobx-react-lite";

import cn from "clsx";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const Sidebar = observer(() => {
  const pathName = usePathname();

  const baseButtonStyles =
    "p-[12px] rounded-image shadow-xl hover:bg-action hover:text-white transition-colors animate-fade";

  return (
    <div className="flex h-max justify-center ">
      <div>
        <ul className="flex flex-col gap-[30px]">
          {layoutIcons.map((icon) => (
            <Link href={sidebarUrls[icon.name].url} key={icon.name}>
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger
                    className={cn(baseButtonStyles, {
                      "bg-action text-white": pathName === sidebarUrls[icon.name].url,
                      "bg-bgPrimary text-black": pathName !== sidebarUrls[icon.name].url,
                    })}
                  >
                    <icon.component />
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>{icon.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
});
