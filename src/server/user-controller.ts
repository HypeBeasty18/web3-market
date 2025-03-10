import { TRPCError } from "@trpc/server";
import { Context } from "./utils/trpc-context";

export const getMeHandler = ({ ctx }: { ctx: Context }) => {
  try {
    const user = ctx.user;
    return {
      status: "success",
      data: {
        user,
      },
    };
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};
