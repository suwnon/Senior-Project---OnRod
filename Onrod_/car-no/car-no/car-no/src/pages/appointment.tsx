import AppointmentById from "@/components/appointment/appointmentbyid";
import { rootRoute } from "@/routes/root";
import { Route } from "@tanstack/react-router";

export const appointmentRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/appointment",
});
export const appointmentIdRoute = new Route({
  getParentRoute: () => appointmentRoute,
  path: "$appointmentId",
  component: function appointmentIdRoute() {
    return <AppointmentById/>;
  },
});
