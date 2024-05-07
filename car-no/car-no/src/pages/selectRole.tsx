import { rootRoute } from "@/routes/root";
import { Route } from "@tanstack/react-router";
import SelectRoleComponents from "@/components/auth/selectrole";
export const roleRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/role",

  component: function AuthRole() {
    return (
        <SelectRoleComponents />
    );
  },
});
