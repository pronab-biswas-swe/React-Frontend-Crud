import { ThemeModeComponent } from "assets/ts/layout";
import clsx from "clsx";
import {
	ThemeModeType,
	useThemeMode,
} from "../../../@context/ThemeModeProvider";
import Icon from "@components/Icon";

/* eslint-disable jsx-a11y/anchor-is-valid */
type Props = {
	toggleBtnClass?: string;
	toggleBtnIconClass?: string;
	menuPlacement?: string;
	menuTrigger?: string;
};

const systemMode = ThemeModeComponent.getSystemMode() as "light" | "dark";

const ThemeModeSwitcher = ({
	toggleBtnClass = "",
	toggleBtnIconClass = "svg-icon-2",
	menuPlacement = "bottom-end",
	menuTrigger = "{default: 'click', lg: 'hover'}",
}: Props) => {
	const { mode, menuMode, updateMode, updateMenuMode } = useThemeMode();
	const calculatedMode = mode === "system" ? systemMode : mode;
	const switchMode = (_mode: ThemeModeType) => {
		updateMenuMode(_mode);
		updateMode(_mode);
	};

	return (
		<>
			{/* begin::Menu toggle */}
			<a
				href="#"
				className={clsx("btn btn-icon ", toggleBtnClass)}
				data-kt-menu-trigger={menuTrigger}
				data-kt-menu-attach="parent"
				data-kt-menu-placement={menuPlacement}
			>
				{calculatedMode === "dark" && (
					<Icon
						icon="dark_mode"
						size={20}
						className={clsx("theme-light-hide", toggleBtnIconClass)}
					/>
				)}

				{calculatedMode === "light" && (
					<Icon
						icon="light_mode"
						size={20}
						className={clsx("theme-light-hide", toggleBtnIconClass)}
					/>
				)}
			</a>
			{/* begin::Menu toggle */}

			{/* begin::Menu */}
			<div
				className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-muted menu-active-bg menu-state-primary fw-semibold py-4 fs-base w-175px"
				data-kt-menu="true"
			>
				{/* begin::Menu item */}
				<div className="menu-item px-3 my-0">
					<a
						href="#"
						className={clsx("menu-link px-3 py-2", {
							active: menuMode === "light",
						})}
						onClick={() => switchMode("light")}
					>
						<span className="menu-icon" data-kt-element="icon">
							<Icon icon="light_mode" size={15} className="svg-icon-3" />
						</span>
						<span className="menu-title">Light</span>
					</a>
				</div>
				{/* end::Menu item */}

				{/* begin::Menu item */}
				<div className="menu-item px-3 my-0">
					<a
						href="#"
						className={clsx("menu-link px-3 py-2", {
							active: menuMode === "dark",
						})}
						onClick={() => switchMode("dark")}
					>
						<span className="menu-icon" data-kt-element="icon">
							<Icon icon="dark_mode" size={15} className="svg-icon-3" />
						</span>
						<span className="menu-title">Dark</span>
					</a>
				</div>
				{/* end::Menu item */}

				{/* begin::Menu item */}
				<div className="menu-item px-3 my-0">
					<a
						href="#"
						className={clsx("menu-link px-3 py-2", {
							active: menuMode === "system",
						})}
						onClick={() => switchMode("system")}
					>
						<span className="menu-icon" data-kt-element="icon">
							<Icon
								icon="settings_system_daydream"
								size={15}
								className="svg-icon-3"
							/>
						</span>
						<span className="menu-title">System</span>
					</a>
				</div>
				{/* end::Menu item */}
			</div>
			{/* end::Menu */}
		</>
	);
};

export { ThemeModeSwitcher };
