import React, { ReactNode } from "react";
import Icon from "../Icon";
import clsx from "clsx";
import { IColors } from "@interface/common.interface";

interface ICollapsable {
  id: string;
  title: string;
  children: ReactNode | ReactNode[] | string;
  className?: string;
  titleClass?: string;
  parentTitle?: string;
  detailsClass?: string;
  startIcon?: string;
  endIcon?: string;
  iconColor?: IColors;
  noShadow?: boolean;
  hasContent?: boolean;
  hasImg?: string;
  removeArrow?: boolean;
  size?: "lg" | "md" | "sm" | "xs";
}

const Collapsable = ({
  id,
  title,
  children,
  className = "my-2 p-3",
  titleClass,
  parentTitle,
  detailsClass = "mt-4 mx-2 ms-15 fs-5 ",
  startIcon,
  endIcon,
  iconColor,
  noShadow = false,
  hasContent,
}: ICollapsable) => {
  return (
    <div
      className={clsx(`card rounded border`, {
        [className]: !!className,
        "shadow shadow-sm": !noShadow,
      })}
      role="button"
    >
      <a
        data-bs-toggle="collapse"
        href={`#${id}`}
        aria-expanded="false"
        aria-controls={id}
        title={parentTitle}
        className={`d-flex align-items-center gap-3 text-dark m-0 fs-3 ${
          titleClass || ""
        }`}
      >
        {startIcon ? (
          <Icon
            icon={startIcon}
            variants="outlined"
            size={25}
            color={iconColor}
          />
        ) : null}

        {title}

        {endIcon ? <Icon icon={endIcon} variants="outlined" size={25} /> : null}
        <Icon
          icon="expand_more"
          variants="outlined"
          size={25}
          className="ms-auto"
        />
      </a>
      <div
        id={id}
        className={clsx(`collapse`, {
          detailsClass: !!detailsClass,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default Collapsable;
