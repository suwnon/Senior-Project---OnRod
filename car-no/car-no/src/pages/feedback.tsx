import FeedbackComponent from "@/components/content/feedback";
import { rootRoute } from "@/routes/root";
import { Route } from "@tanstack/react-router";

export const feedbackRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/feedback",

  component: function feedbackPage() {
    return <FeedbackComponent />;
  },
});
