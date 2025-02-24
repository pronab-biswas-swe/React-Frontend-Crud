import { IAppRoutes } from "@interface/common.interface";
import { TopProgressCom } from "@services/utils/top-progress";
import { AuthLayout } from "layout/AuthLayout";
import MasterLayout from "layout/MasterLayout";
import { Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { AppRouteList } from "./routes/app.routes";
import { LandingRoutes } from "./routes/landing.routes";

const generateRouteElement = (routes: IAppRoutes[]) =>
  routes.map((route, index: number) => {
    if (route.childrens && route.childrens.length) {
      return (
        <Route
          path={route.link}
          element={
            route.element ? (
              <Suspense>
                <route.element />
              </Suspense>
            ) : (
              <>
                <Outlet />
              </>
            )
          }
          key={index}
        >
          {generateRouteElement(route.childrens)}
        </Route>
      );
    }

    return (
      <Route
        key={index}
        path={route.link}
        element={
          route.redirect ? (
            <Navigate to={route.redirect} />
          ) : (
            <Suspense fallback={<TopProgressCom />}>
              <route.element />
            </Suspense>
          )
        }
      />
    );
  });

const PublicRoutes = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      {generateRouteElement(LandingRoutes)}
    </Route>
  </Routes>
);

const PrivateRoutes = () => (
  <Routes>
    <Route element={<MasterLayout />}>
      {generateRouteElement(AppRouteList)}
    </Route>
  </Routes>
);

export { PrivateRoutes, PublicRoutes };
