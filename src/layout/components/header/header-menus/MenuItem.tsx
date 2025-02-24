import { FC } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { checkIsActive } from "utility/check-validation";

type Props = {
  to: string;
  title: string;
  icon?: string;
  fontIcon?: string;
  hasArrow?: boolean;
  hasBullet?: boolean;
};

const MenuItem: FC<Props> = ({
  to,
  title,
  icon,
  fontIcon,
  hasArrow = false,
  hasBullet = false,
}) => {
  const { pathname } = useLocation();

  return (
    <div className="menu-item me-lg-1 bg-hover-secondary">
      <Link
        className={clsx("menu-link", {
          "active menu-here": checkIsActive(pathname, to),
        })}
        to={to}
      >
        <span className="menu-title">{title}</span>

        {hasArrow && <span className="menu-arrow"></span>}
      </Link>
    </div>
  );
};

export { MenuItem };
