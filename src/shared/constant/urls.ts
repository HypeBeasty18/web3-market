export type TypePages = "Home" | "Crowdfunding" | "NFT";

interface IUrlSidebar {
  name: TypePages;
  url: string;
}

interface IUrlHeader {
  name: string;
  url: string;
}

export const sidebarUrls: Record<TypePages, IUrlSidebar> = {
  Home: {
    name: "Home",
    url: "/",
  },
  Crowdfunding: {
    name: "Crowdfunding",
    url: "/crowdfunding",
  },
  NFT: {
    name: "NFT",
    url: "/nft",
  },
};

export const headerUrls: IUrlHeader[] = [
  {
    name: "Sign up",
    url: "/signup",
  },
  {
    name: "Log in",
    url: "/login",
  },
];
