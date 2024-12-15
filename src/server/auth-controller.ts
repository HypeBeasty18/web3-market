import { db } from "@/db";
import { users } from "@/db/schema";
import { ACCESS_TOKEN } from "@/shared/constant/tokens";
import { ILogin, ISignUp } from "@/shared/types";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const registerHandler = async ({ input }: { input: ISignUp }) => {
  const cookieStore = await cookies();

  try {
    const hashedPassword = await bcrypt.hash(input.password, 12);

    const [newUser] = await db
      .insert(users)
      .values({
        email: input.email,
        username: input.username,
        password: hashedPassword,
      })
      .returning();
    //@ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = newUser;

    const secret = process.env.JWT_SECRET!;
    const token = jwt.sign({ sub: newUser.id }, secret, {
      expiresIn: 1000 * 60 * 20,
    });

    const cookieOptions = {
      httpOnly: false,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 20,
    };

    cookieStore.set(ACCESS_TOKEN, token, cookieOptions);

    return {
      status: "success",
      token,
    };
  } catch (err: any) {
    if (err.code === "P2002") {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Email already exists",
      });
    }
    throw err;
  }
};

export const loginHandler = async ({ input }: { input: ILogin }) => {
  const cookieStore = await cookies();
  try {
    const user = await db.select().from(users).where(eq(users.email, input.email)).limit(1);

    if (!user || !(await bcrypt.compare(input.password, user[0].password))) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid email or password",
      });
    }

    const secret = process.env.JWT_SECRET!;
    const token = jwt.sign({ sub: user[0].id }, secret, {
      expiresIn: 1000 * 60 * 20,
    });

    const cookieOptions = {
      httpOnly: false,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 20,
    };

    cookieStore.set(ACCESS_TOKEN, token, cookieOptions);

    return {
      status: "success",
      token,
    };
  } catch (err: any) {
    throw err;
  }
};

export const logoutHandler = async () => {
  const cookieStore = await cookies();
  try {
    cookieStore.set(ACCESS_TOKEN, "", {
      maxAge: -1,
    });
    return { status: "success" };
  } catch (err: any) {
    throw err;
  }
};
