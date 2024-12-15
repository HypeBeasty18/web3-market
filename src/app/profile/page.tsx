import Header from "@/components/header";
import { getAuthUser } from "@/server/utils/get-auth-user";

export default async function ProfilePage() {
  const user = await getAuthUser();

  return (
    <>
      <Header />
      <section className="bg-ct-blue-600  min-h-screen pt-20">
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
          <div>
            <p className="mb-3 text-5xl text-center font-semibold">Profile Page</p>
            <div className="mt-8">
              <p className="mb-3">Id: {user && user[0].id}</p>
              <p className="mb-3">Name: {user && user[0].username}</p>
              <p className="mb-3">Email: {user && user[0].email}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
