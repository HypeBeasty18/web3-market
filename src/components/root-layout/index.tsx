import { PropsWithChildren } from "react";
import { Sidebar } from "./sidebar/sidebar";
import { Header } from "./header/header";

export const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className=" flex flex-col w-full h-full bg-white ">
      <div className="">
        <Header />
      </div>
      <div className="flex w-full h-full  ">
        <div className="flex justify-center w-[120px] pt-[10%] shadow-xl z-1 ">
          <Sidebar />
        </div>
        <div className="bg-[#FAFAFA] rounded-3xl w-full h-full  ">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};
