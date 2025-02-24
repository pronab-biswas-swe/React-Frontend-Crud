import { LANDING } from "@constants/internal-route.constant";
import { IAppRoutes } from "@interface/common.interface";
import { lazy } from "react";

export const LandingRoutes: IAppRoutes[] = [
  {
    link: LANDING,
    element: lazy(() => import("pages/landing")),
  },
  {
    link: "*",
    redirect: LANDING,
  },
];
