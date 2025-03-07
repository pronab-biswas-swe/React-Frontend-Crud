import { EMPLOYEE, USERS } from "@constants/internal-route.constant";
import { IAppRoutes } from "@interface/common.interface";
import { lazy } from "react";

export const AppRouteList: IAppRoutes[] = [
  {
    link: EMPLOYEE,
    element: lazy(() => import("pages/employee")),
  },
  {
    link: USERS,
    element: lazy(() => import("pages/users")),
  },
  {
    link: "/*",
    redirect: EMPLOYEE,
  },
  {
    link: "*",
    element: lazy(() => import("pages/errors/components/Error404")),
  },
];
