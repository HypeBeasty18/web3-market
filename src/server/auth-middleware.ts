import { db } from "@/db";
import { users } from "@/db/schema";
import { ACCESS_TOKEN } from "@/shared/constant/tokens";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

export const deserializeUser = async () => {
  const cookieStore = await cookies();
  try {
    let token;
    if (cookieStore.get(ACCESS_TOKEN)) {
      token = cookieStore.get(ACCESS_TOKEN)?.value;
    }

    const notAuthenticated = {
      user: null,
    };

    if (!token) {
      return notAuthenticated;
    }

    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as { sub: string };

    if (!decoded) {
      return notAuthenticated;
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, decoded.sub))
      .limit(1);

    if (!user) {
      return notAuthenticated;
    }
    //@ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
    };
  } catch (err: any) {
    return {
      user: null,
    };
  }
};
