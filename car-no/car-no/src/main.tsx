import "./index.css";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, Router, Route } from "@tanstack/react-router";
import { rootRoute } from "./routes/root";
import { indexRoute } from "./pages/home";
import { siginRoute } from "./pages/sigin";
import { signupRoute } from "./pages/sigup";
import { roleRoute } from "./pages/selectRole";
import { feedbackRoute } from "./pages/feedback";
import { sellerRoute } from "./pages/seller";
import {
  expertCarId,
  expertRoute,
  expertIndexRoute,
  expertComment,
  expertAppoveList,
} from "./pages/expert";
import { carIdRoute, carRoute, selectExpertId } from "./pages/car";
import { buyAppoveIdRoute, buyHomeRoute, buyRoute } from "./pages/buy";
import { AuthProvider } from "./context/authOption";
import { appointmentIdRoute, appointmentRoute } from "./pages/appointment";

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: function About() {
    return <div className="p-2">Hello from About!</div>;
  },
});

const routeTree = rootRoute.addChildren([
  aboutRoute,
  siginRoute,
  signupRoute,
  roleRoute,
  feedbackRoute,
  sellerRoute,
  expertRoute.addChildren([
    expertCarId,
    expertAppoveList,
    expertIndexRoute.addChildren([expertComment]),
  ]),
  appointmentRoute.addChildren([appointmentIdRoute]),
  indexRoute.addChildren([
    buyRoute.addChildren([buyHomeRoute , buyAppoveIdRoute]),
    carRoute.addChildren([carIdRoute, selectExpertId]),
  ]),
]);

const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </StrictMode>
  );
}
