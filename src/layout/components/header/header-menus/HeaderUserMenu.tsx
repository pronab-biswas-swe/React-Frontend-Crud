/* eslint-disable jsx-a11y/anchor-is-valid */
import Icon from "@components/Icon";
import { FC } from "react";

type HeaderUserMenuProps = {
  logout: () => void;
};
const HeaderUserMenu: FC<HeaderUserMenuProps> = ({ logout }) => {
  return (
    <div
      className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold pb-4 pt-2 fs-6 w-275px"
      data-kt-menu="true"
    >
      <div className="menu-item px-3"></div>

      <div className="menu-item px-5">
        <a onClick={logout} className="menu-link px-5">
          <Icon icon="logout" size={20} className="me-2" />
          Log Out
        </a>
      </div>
    </div>
  );
};

export default HeaderUserMenu;
