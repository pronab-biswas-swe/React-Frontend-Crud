import React, { useEffect, useId, useState } from "react";
import Icon from "../Icon";
import clsx from "clsx";
import { ISizes } from "@interface/common.interface";
import { numEnToBn } from "utility/translator";

type ITextareaProps = {
	name?: string;
	size?: ISizes;
	variant?: "solid" | "outline";
	label?: string;
	autoFocus?: boolean;
	isRequired?: boolean;
	disabled?: boolean;
	hasInfo?: boolean;
	infoText?: string;
	placeholder?: string;
	defaultValue?: string | number;
	value?: string | number;
	onChange?: (event: any) => void;
	maxLength?: string | number;
	isError?: boolean;
	isValid?: boolean;
	errorMessage?: string;
	noMargin?: boolean;
	rows?: number;
	helpText?: string;
	registerProperty?: any;
	className?: string;
	viewOnly?: string;
};

const Textarea = ({
	name,
	size = "sm",
	autoFocus,
	variant = "outline",
	label,
	placeholder,
	defaultValue,
	value,
	isRequired,
	onChange,
	maxLength,
	hasInfo,
	disabled,
	infoText,
	isError,
	isValid,
	errorMessage,
	rows,
	noMargin,
	helpText,
	registerProperty,
	className,
	viewOnly,
}: ITextareaProps) => {
	const id = useId();
	const [charCount, setCharCount] = useState<number | null>(null);

	const inp = document.getElementById(id) as HTMLInputElement;
	useEffect(() => {
		inp?.addEventListener("focus", () => setCharCount(inp.value?.length));
		return () => inp?.removeEventListener("focus", () => {});
	}, [inp]);

	const onType = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (maxLength) setCharCount(e.target.value?.length || 0);
		onChange && onChange(e);
		registerProperty && registerProperty?.onChange(e);
	};

	return (
		<div
			className={clsx("w-100 fv-row", {
				[className as string]: !!className,
				"mb-6": !noMargin,
			})}
		>
			{label ? (
				<label className="d-flex align-items-center fs-5">
					<span className={clsx({ required: isRequired })}>{label}</span>
					{hasInfo && <Icon icon="info" size={15} hoverTitle={infoText} />}
				</label>
			) : null}
			{!!viewOnly ? (
				<span className="ms-2 fs-5 fw-bold text-gray-800">{viewOnly}</span>
			) : (
				<textarea
					id={id}
					autoFocus={autoFocus}
					className={clsx(
						`form-control form-control-${size} form-control-${variant} fs-6`,
						{ "is-valid": isValid, "is-invalid": isError }
					)}
					name={name}
					required={isRequired}
					disabled={disabled}
					defaultValue={defaultValue}
					placeholder={placeholder}
					value={value}
					rows={rows}
					maxLength={maxLength}
					{...registerProperty}
					onChange={onType}
				/>
			)}
			{isError && !viewOnly && (
				<div className="invalid-feedback">{errorMessage}</div>
			)}
			<div className="d-flex">
				{!!helpText && !viewOnly && (
					<small className="text-muted">{helpText}</small>
				)}
				{!!maxLength && !viewOnly && charCount !== null && (
					<span className="ms-auto text-gray-600">
						{numEnToBn(charCount)}/{numEnToBn(maxLength)}
					</span>
				)}
			</div>
		</div>
	);
};

export default Textarea;
