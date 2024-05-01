import CarCommentComponent from "@/components/expert/carcomment";
import ExpertSelectCarId from "@/components/expert/carid";
import CarListComponent from "@/components/expert/listcars";
import ViewExpertComponent from "@/components/expert/listexpert";
import { rootRoute } from "@/routes/root";
import { Route } from "@tanstack/react-router";

export const expertRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "expert",
});

export const expertIndexRoute = new Route({
  getParentRoute: () => expertRoute,
  path: "/",
  component: function expertIndex() {
    return <CarListComponent />;
  },
});

export const expertComment = new Route({
  getParentRoute: () => expertRoute,
  path: "/comment/$postId",
  component: function expertComment() {
    return <CarCommentComponent />;
  },
});

export const expertCarId = new Route({
  getParentRoute: () => expertRoute,
  path: "$postId",
  component: function expertCarId() {
    return <ExpertSelectCarId />;
  },
});

export const expertAppoveList = new Route({
  getParentRoute: () => expertRoute,
  path: "/appove",
  component: function expertAppoveList() {
    return <ViewExpertComponent />;
  },
});
