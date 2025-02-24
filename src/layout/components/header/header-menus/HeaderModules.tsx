/* eslint-disable jsx-a11y/anchor-is-valid */
import Icon from "@components/Icon";
import { EMPLOYEE } from "@constants/internal-route.constant";
import React, { FC } from "react";

const HeaderModules: FC = () => {
  return (
    <div className="menu-column overflow-hidden">
      <div className="row g-0"></div>

      <div className="border-top">
        <a
          href={EMPLOYEE}
          className="btn btn-color-gray-600 bg-hover-light-primary btn-active-color-primary d-flex align-items-center justify-content-center gap-1"
        >
          <Icon icon="home" variants="outlined" size={18} />
          হোম
        </a>
      </div>
    </div>
  );
};

export default HeaderModules;
