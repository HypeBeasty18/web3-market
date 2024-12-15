"use client";
import { TypeUser, users } from "@/db/schema";
import { useCallback, useEffect, useRef, useState } from "react";
import Cookie from "js-cookie";
import { ACCESS_TOKEN } from "@/shared/constant/tokens";
import jwt from "jsonwebtoken";
import isEqual from "lodash.isequal";
import { db } from "@/db";
import { eq } from "drizzle-orm";
export const useAuth = () => {
  const [user, SetUser] = useState<TypeUser | null>(null);
  const tokenRef = useRef<string | null>(null);

  useEffect(() => {
    const verifyCookie = setInterval(async () => {
      const updatedToken = Cookie.get(ACCESS_TOKEN);

      if (!updatedToken) {
        SetUser(null);
        return;
      }

      try {
        const secret = process.env.JWT_SECRET!;
        console.log("secret", secret, updatedToken);

        const decoded = jwt.verify(updatedToken, secret) as { sub: string };
        if (!decoded) {
          SetUser(null);
          return;
        }

        console.log("decoded", decoded);

        if (updatedToken !== tokenRef.current) {
          console.log("updatedToken", updatedToken);
          console.log("tokenRef.current", tokenRef.current);

          tokenRef.current = updatedToken;

          const updatedUser = await db
            .select()
            .from(users)
            .where(eq(users.id, decoded.sub))
            .limit(1);

          if (!updatedUser || updatedUser.length === 0) {
            SetUser(null);
            return;
          }

          console.log("updatedUser", updatedUser);

          updateUser(updatedUser[0]);
        }
      } catch (error) {
        console.log("error", error);

        SetUser(null);
      }
    }, 2000);

    return () => {
      console.log("clean");

      clearInterval(verifyCookie);
    };
  }, []);

  const updateUser = useCallback(
    (updatedUser: TypeUser | null) => {
      if (!isEqual(updatedUser, user)) {
        console.log("updated user state");

        SetUser(updatedUser);
      }
    },
    [user]
  );

  return user;
};
