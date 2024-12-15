import { TypePages } from "@/shared/constant/urls";

import { House, LucideProps, Coins, Image } from "lucide-react";
import React from "react";

interface IIcon {
  name: TypePages;
  component: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

export const layoutIcons: IIcon[] = [
  {
    name: "Home",
    component: House,
  },
  {
    name: "Crowdfunding",
    component: Coins,
  },
  {
    name: "NFT",
    component: Image,
  },
];
