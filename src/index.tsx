import { AppRoutes } from "@routing/AppRoutes";
import "assets/sass/plugins.scss";
import "assets/sass/style.react.scss";
import "assets/sass/style.scss";
import "react-toastify/dist/ReactToastify.css";
import { createRoot } from "react-dom/client";
// Apps

const container = document.getElementById("root");
if (container) {
  createRoot(container).render(<AppRoutes />);
}
