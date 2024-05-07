import ViewAppoveCustomer from "@/components/buy/viewappove";
import Viewproducts from "@/components/content/viewproducts";
import { rootRoute } from "@/routes/root";
import { Route } from "@tanstack/react-router";

export const buyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/buyer",
});

export const buyHomeRoute = new Route({
  getParentRoute: () => buyRoute,
  path: "/",
  component: function buyHomeRoute() {
    return <Viewproducts />;
  },
});

export const buyAppoveIdRoute = new Route({
  getParentRoute: () => buyRoute,
  path: "/appove",
  component: function buyIdRoute() {
    return <ViewAppoveCustomer/>
  },
});
