import SelectCaruById from "@/components/buy/selectbyid";
import SelectourExpertComponent from "@/components/buy/selectourexpert";
import { rootRoute } from "@/routes/root";
import { Route } from "@tanstack/react-router";

export const carRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/car",
});
export const carIdRoute = new Route({
  getParentRoute: () => carRoute,
  path: "$carId",
  component: function carIdRoute() {
    return <SelectCaruById/>;
  },
});

export const selectExpertId = new Route({
  getParentRoute: () => carRoute,
  path: "$carId/expert",
  component: function carIdRoute() {
    return <SelectourExpertComponent/>;
  },
});
