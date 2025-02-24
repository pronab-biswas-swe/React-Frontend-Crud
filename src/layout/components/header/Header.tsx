import { FC } from "react";
import { MenuInner } from "./header-menus/MenuInner";

const Header: FC = () => {
  return (
    <div
      className="
        menu
        menu-rounded
        menu-column
        menu-lg-row
        my-5
        my-lg-0
        align-items-stretch
        fw-semibold
        px-2 px-lg-0
    "
      id="kt_app_header_menu"
      data-kt-menu="true"
    >
      <MenuInner />
    </div>
  );
};

export { Header };
