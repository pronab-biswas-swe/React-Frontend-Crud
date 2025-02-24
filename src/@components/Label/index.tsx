import clsx from "clsx";
import { ReactNode } from "react";

interface ILabelProps {
	children?: string | ReactNode;
	isRequired?: boolean;
	labelRight?: JSX.Element | JSX.Element[] | string;
	className?: string;
}

function Label({
	children,
	isRequired,
	labelRight,
	className = "",
}: ILabelProps) {
	return (
		<div>
			<label className={clsx("form-label fs-5", { [className]: !!className })}>
				{children} {isRequired && <span className="text-danger">*</span>}
			</label>
			{labelRight && <div className="float-end">{labelRight}</div>}
		</div>
	);
}

export default Label;
