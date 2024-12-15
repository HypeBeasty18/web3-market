import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { trpc } from "@/server/utils/trpc";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { queryClient } from "@/shared/constant/react-query";

export const HeaderMenu = () => {
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
    <DropdownMenuContent>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer">Billing</DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer">Team</DropdownMenuItem>
      <DropdownMenuItem onClick={() => logoutFn()} className="cursor-pointer">
        Logout
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};
