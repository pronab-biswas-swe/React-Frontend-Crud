import { LayoutProvider, LayoutSplashScreen } from "layout/core";
import { MasterInit } from "layout/MasterInit";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <ToastContainer />
      <LayoutProvider>
        <Outlet />
        <MasterInit />
      </LayoutProvider>
    </Suspense>
  );
};

export { App };
