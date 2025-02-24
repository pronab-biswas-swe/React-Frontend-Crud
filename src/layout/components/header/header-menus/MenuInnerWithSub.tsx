import clsx from "clsx";
import { WithChildren } from "helpers";
import { FC, useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { checkIsActive } from "utility/check-validation";

type Props = {
  to: string;
  title: string;
  icon?: string;
  fontIcon?: string;
  menuTrigger?: "hover" | `{default:'hover', lg: 'hover'}`;
  menuPlacement?: "right-start" | "bottom-start" | "left-start";
  hasArrow?: boolean;
  hasBullet?: boolean;
  isMega?: boolean;
  className?: string;
};

const MenuInnerWithSub: FC<Props & WithChildren> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  menuTrigger,
  menuPlacement,
  hasArrow = false,
  hasBullet = false,
  isMega = false,
  className,
}) => {
  const menuItemRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (menuItemRef.current && menuTrigger && menuPlacement) {
      menuItemRef.current.setAttribute("data-kt-menu-trigger", menuTrigger);
      menuItemRef.current.setAttribute("data-kt-menu-placement", menuPlacement);
    }
  }, [menuTrigger, menuPlacement]);

  return (
    <Link to={to}>
      <div
        ref={menuItemRef}
        className={
          className
            ? className
            : "menu-item menu-lg-down-accordion text-primary bg-hover-secondary"
        }
      >
        <span
          className={clsx("menu-link", {
            active: checkIsActive(pathname, to),
          })}
        >
          <span className="menu-title">{title}</span>

          {hasArrow && <span className="menu-arrow"></span>}
        </span>
        <div
          className={clsx(
            "menu-sub menu-sub-lg-down-accordion fs-3 menu-sub-lg-dropdown",
            isMega
              ? "w-100 w-lg-850px p-5 p-lg-5"
              : "menu-rounded-0 py-lg-3 w-lg-225px"
          )}
          data-kt-menu-dismiss="true"
        >
          <div>{children}</div>
        </div>
      </div>
    </Link>
  );
};

export { MenuInnerWithSub };
