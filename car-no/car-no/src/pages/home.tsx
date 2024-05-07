import TitleComponets from "@/components/content/title";
import { rootRoute } from "@/routes/root";
import { Route } from "@tanstack/react-router";

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: function Index() {
    return (
      <div className="flex flex-col overflow-hidden">
        <TitleComponets />
      </div>
    );
  },
});
