import { IColors } from "@interface/common.interface";
import clsx from "clsx";
import { ReactNode } from "react";
import "./tag.scss";
import Icon from "@components/Icon";

type ITagProps = {
	title: string | number | ReactNode | ReactNode[];
	color?: IColors;
	variant?: "light" | "fill";
	size?: "sm" | "md";
	className?: string;
	onClose?: () => void;
};

const Tag = ({
	title,
	color = "primary",
	variant = "light",
	size = "sm",
	className,
	onClose,
}: ITagProps) => {
	return (
		<span
			className={clsx(`badge fs-7`, {
				[`badge-light-${color}`]: variant === "light",
				[`badge-${color}`]: variant !== "light",
				"fw-bolder px-4 py-3": size === "md",
				[className as string]: !!className,
			})}
			style={{ width: "fit-content" }}
		>
			{typeof title === "number" || typeof title === "string" ? (
				<span>{title}</span>
			) : (
				title
			)}
			{!!onClose && (
				<Icon
					icon="close"
					size={14}
					className="badge-close ms-2"
					onClick={onClose}
				/>
			)}
		</span>
	);
};

export default Tag;
