import authRouter from "@/server/auth-route";
import { protectedProcedure, t } from "@/server/trpc-server";
import { getMeHandler } from "@/server/user-controller";
import { createContext } from "@/server/utils/trpc-context";

const healthCheckerRouter = t.router({
  healthchecker: t.procedure.query(() => {
    return {
      status: "success",
      message: "Everything is work",
    };
  }),
});

const userRouter = t.router({
  getMe: protectedProcedure.query(({ ctx }) => getMeHandler({ ctx })),
});

export const appRouter = t.mergeRouters(healthCheckerRouter, authRouter, userRouter);

export const createCaller = t.createCallerFactory(appRouter);

export const createAsyncCaller = async () => {
  const context = await createContext();
  return createCaller(context);
};

export type AppRouter = typeof appRouter;
