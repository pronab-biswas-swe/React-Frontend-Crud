/* eslint-disable jsx-a11y/anchor-is-valid */
import { Route, Routes } from "react-router-dom";
import Error404 from "./components/Error404";
import { ErrorsLayout } from "./ErrorsLayout";

const ErrorsPage = () => (
  <Routes>
    <Route element={<ErrorsLayout />}>
      <Route index element={<Error404 />} />
    </Route>
  </Routes>
);

export { ErrorsPage };
