import { rootRoute } from "@/routes/root";
import { Route } from "@tanstack/react-router";
import SiginComponents from "@/components/auth/sigin";
export const siginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/sigin",

  component: function AuthSigin() {
    return (
        <SiginComponents />
    );
  },
});
