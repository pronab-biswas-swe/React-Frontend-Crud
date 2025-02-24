import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div
      className="d-flex flex-column flex-root h-100"
      id="kt_app_root"
      style={{ backgroundImage: "url('/media/auth/bg10.jpeg')" }}
    >
      <Outlet />
    </div>
  );
};

export { AuthLayout };
