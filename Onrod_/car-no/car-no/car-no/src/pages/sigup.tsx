import { rootRoute } from "@/routes/root";
import { Route } from "@tanstack/react-router";
import SigupComponents from "@/components/auth/sigup";
export const signupRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/signup",

  component: function AuthSignup() {
    return (
        <SigupComponents/>
    );
  },
});
