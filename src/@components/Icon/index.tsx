import React from "react";
import "./Icon.scss";
import clsx from "clsx";
import { IColors } from "@interface/common.interface";

interface IIcon {
	icon: string;
	variants?: "outlined" | "filled" | "round" | "sharp" | "two-tone";
	color?: IColors;
	onClick?: any;
	className?: string;
	id?: string;
	role?: string;
	disabled?: boolean;
	hoverTitle?: string;
	style?: any;
	size?: number;
	rotate?: 45 | 90 | 135 | 180 | 225 | 270 | 315;
}

const Icon = ({
	icon,
	variants = "filled",
	color,
	onClick,
	className,
	id,
	role,
	disabled,
	hoverTitle,
	style,
	size,
	rotate,
}: IIcon) => (
	<span
		title={hoverTitle}
		onClick={onClick}
		className={clsx(
			"noselect",
			`${
				variants === "filled" ? "material-icons" : `material-icons-${variants}`
			}`,
			"icon",
			{
				[`text-${color}`]: !!color,
				[`rotate-${rotate}`]: !!rotate,
				icon_disabled: disabled,
				[className as string]: className,
			}
		)}
		id={id}
		role={role}
		style={{ fontSize: size || "1.1rem", ...style }}
	>
		{icon}
	</span>
);

export default Icon;
