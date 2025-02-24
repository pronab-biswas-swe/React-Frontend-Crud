import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorsPage } from "../pages/errors/ErrorsPage";
import { App } from "../App";
import { PrivateRoutes, PublicRoutes } from "./RouterElements";
import { ENV } from "config/ENV.config";
import { isObjectNull } from "utility/check-validation";
import { LocalStorageService } from "@services/utils/localStorage.service";

const PUBLIC_URL = ENV.public_url;

const AppRoutes: FC = () => {
  const isAuthenticated = isObjectNull(LocalStorageService.get("user"))
    ? false
    : true;
  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<App />}>
          {isAuthenticated ? (
            <Route path="/*" element={<PrivateRoutes />} />
          ) : (
            <Route path="/*" element={<PublicRoutes />} />
          )}
          <Route path="error/*" element={<ErrorsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
