import Link from "next/link";
import AuthMenu from "./auth-menu";
import rootStore from "@/entities/root-store";
import { observer } from "mobx-react-lite";

const Header = observer(() => {

  console.log(rootStore.isAuth);
  
  return (
    <header className="bg-white h-20">
      <nav className="h-full flex justify-between container items-center">
        <div>
          <Link href="/" className="text-ct-dark-600 text-2xl font-semibold">
            CodevoWeb
          </Link>
        </div>
        <ul className="flex items-center gap-4">
          <li>
            <Link href="/" className="text-ct-dark-600">
              Home
            </Link>
          </li>
          {!rootStore.isAuth && (
            <>
              <li>
                <Link href="/register" className="text-ct-dark-600">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-ct-dark-600">
                  Login
                </Link>
              </li>
            </>
          )}
          {rootStore.isAuth && <AuthMenu />}
        </ul>
      </nav>
    </header>
  );
});

export default Header;
