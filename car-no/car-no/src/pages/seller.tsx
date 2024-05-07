import CreateCarSeller from "@/components/seller/createseller";
import { rootRoute } from "@/routes/root";
import { Route } from "@tanstack/react-router";

export const sellerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/seller",

  component: function sellerPage() {
    return <CreateCarSeller />;
  },
});
