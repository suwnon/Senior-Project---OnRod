import NavbarComponent from "@/components/layout/navbar";
import { Outlet, RootRoute } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const rootRoute = new RootRoute({
  component: () => (
    <>
        <NavbarComponent>
          <Outlet />
          {/* <TanStackRouterDevtools /> */}
        </NavbarComponent>
    </>
  ),
});
