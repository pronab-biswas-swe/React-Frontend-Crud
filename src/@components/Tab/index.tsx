import clsx from "clsx";
import "./tab.scss";

type ITabItemProps = {
	label: string;
	key: string;
	isHide?: boolean;
};

type ITabProps = {
	tabs: Array<ITabItemProps>;
	tabLabelKey: string;
	activeIndex: number;
	onChange: (idx: number) => void;
};

const Tab = ({ tabs, tabLabelKey, activeIndex, onChange }: ITabProps) => {
	return (
		<div className="d-flex overflow-auto border-bottom">
			<ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap">
				{tabs?.map((t, i) => (
					<li
						className={clsx("nav-item tab-nav-item", { "d-none": t.isHide })}
						key={i}
						onClick={() => onChange(i)}
					>
						<span
							className={
								`nav-link text-active-primary cursor-pointer me-6 ` +
								(activeIndex === i && "active")
							}
						>
							{t?.[tabLabelKey]}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Tab;
