import { ISizes } from "@interface/common.interface";
import clsx from "clsx";

type IRadioButton = {
	name?: string;
	label?: string;
	subLabel?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	checked?: boolean;
	defaultChecked?: boolean;
	isDisabled?: boolean;
	noMargin?: boolean;
	size?: ISizes;
	value: string | number;
	registerProperty?: any;
	viewOnlyActive?: boolean; // For primary condition to active the viewOnly mode
	viewOnly?: string | boolean | number;
};

const RadioButton = ({
	name,
	label,
	subLabel,
	onChange,
	checked,
	defaultChecked,
	isDisabled,
	noMargin,
	size = "md",
	value,
	registerProperty,
	viewOnlyActive,
	viewOnly,
}: IRadioButton) => {
	viewOnly = viewOnly?.toString();

	if (viewOnlyActive && viewOnly !== value.toString()) return;

	return (
		<label
			className={clsx([
				`d-flex align-items-center gap-3`,
				{ "mb-6": !noMargin },
				{ "cursor-pointer": !viewOnlyActive },
			])}
		>
			<span
				className={`form-check form-check-custom form-check-${size} form-check-outline`}
			>
				{viewOnlyActive && value.toString() === viewOnly ? null : (
					<input
						className="form-check-input"
						role="button"
						name={name}
						type="radio"
						value={value}
						disabled={isDisabled}
						defaultChecked={defaultChecked}
						checked={checked}
						onChange={onChange}
						{...registerProperty}
					/>
				)}
			</span>
			<div className="d-flex flex-column">
				<span
					className={
						viewOnlyActive && value.toString() === viewOnly ? "fs-4 fw-bold" : "fs-6"
					}
				>
					{label}
				</span>
				{subLabel ? <span className="fs-7 text-muted">{subLabel}</span> : null}
			</div>
		</label>
	);
};

export default RadioButton;
