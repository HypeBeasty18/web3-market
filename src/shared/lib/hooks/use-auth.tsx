"use client";
import { useEffect, useRef } from "react";

import Cookie from "js-cookie";
import { ACCESS_TOKEN } from "@/shared/constant/tokens";
import rootStore from "@/entities/root-store";

export const UseAuth = () => {
  const tokenRef = useRef("");

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookie.get(ACCESS_TOKEN);

      if (token) {
        if (token !== tokenRef.current) {
          rootStore.isAuth = true;
          tokenRef.current = token;
        }
      } else {
        rootStore.isAuth = false;
      }
    };

    const intervalId = setInterval(() => {
      checkAuth();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return {};
};
