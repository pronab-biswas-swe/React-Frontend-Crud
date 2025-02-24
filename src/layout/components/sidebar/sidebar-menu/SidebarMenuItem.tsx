import Icon from "@components/Icon";
import clsx from "clsx";
import { FC, ReactNode } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { checkIsActive } from "utility/check-validation";

const Anchor = ({ children, to, className, isExtarnal }) =>
	isExtarnal ? (
		<a href={to} className={className}>
			{children}
		</a>
	) : (
		<Link className={className} to={to}>
			{children}
		</Link>
	);

type Props = {
	to: string;
	isExtarnal?: boolean;
	title: string;
	fontIcon?: string;
	hasBullet?: boolean;
	children?: ReactNode;
};

const SidebarMenuItem: FC<Props> = ({
	children,
	to,
	isExtarnal,
	title,
	fontIcon,
	hasBullet = false,
}) => {
	const { pathname } = useLocation();
	const isActive = checkIsActive(pathname, to);

	return (
		<div className="menu-item">
			<Anchor
				className={clsx("menu-link without-sub", { active: isActive })}
				to={to}
				isExtarnal={isExtarnal}
			>
				{hasBullet && (
					<span className="menu-bullet">
						<span className="bullet bullet-dot"></span>
					</span>
				)}
				{fontIcon && <Icon icon={fontIcon} size={25} className="me-3" variants="outlined" />}
				<span className="menu-title">{title}</span>
			</Anchor>
			{children}
		</div>
	);
};

export { SidebarMenuItem };
