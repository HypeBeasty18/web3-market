"use client";
import { TypeUser } from "@/db/schema";

import React, { useEffect, PropsWithChildren, createContext } from "react";

interface IAuthWrapper {
  user: TypeUser | null;
}

const AuthContext = createContext<IAuthWrapper>({ user: null });

export const AuthWrapper = ({ children }: PropsWithChildren) => {
  const user = null;

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};
