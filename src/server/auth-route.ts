import { loginSchema, signUpSchema } from "@/shared/types";
import { loginHandler, logoutHandler, registerHandler } from "./auth-controller";
import { pubicProcedure, t } from "./trpc-server";

const authRouter = t.router({
  registerUser: pubicProcedure
    .input(signUpSchema)
    .mutation(({ input }) => registerHandler({ input })),
  loginUser: pubicProcedure.input(loginSchema).mutation(({ input }) => loginHandler({ input })),
  logoutUser: pubicProcedure.mutation(() => logoutHandler()),
});

export default authRouter;
