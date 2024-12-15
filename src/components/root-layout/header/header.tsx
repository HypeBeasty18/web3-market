import { getAuthUser } from "@/server/utils/get-auth-user";
import { AuthHeader } from "./auth-header/auth-header";
import { UserHeader } from "./user-header/user-header";

export const Header = async () => {
  const user = await getAuthUser();

  return (
    <div className="relative flex justify-end px-4 py-2 w-full ">
      {user ? <UserHeader /> : <AuthHeader />}
    </div>
  );
};
