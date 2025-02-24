import Icon from "../Icon";
import { Input } from "../Input";
import { Controller } from "react-hook-form";
import React, { FC, memo, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import MediaPreview from "../MediaPreview";
import { toast } from "@services/utils/toast";
import { IFile, IObject } from "@interface/common.interface";
import { isObjectNull } from "utility/check-validation";
import { convertByteToMB } from "utility/utils";
import { numEnToBn } from "utility/translator";

type SingleFileProps = {
	label?: string;
	name?: string;
	control?: any;
	isRequired?: boolean | string;
	disabled?: boolean;
	defaultFile?: File | IFile | null;
	file?: File | IFile | null;
	accept?: string;
	maxSize?: number; // Size in MB
	helpText?: string;
	onChange?: (fileValue: File | IFile | null, name: string | null) => void;
	isError?: boolean;
	errorMessage?: string;
	viewOnly?: IObject;
	noMargin?: boolean;
};

const FileUpload: FC<SingleFileProps> = memo(
	({
		label,
		name,
		isRequired,
		disabled,
		defaultFile,
		file,
		accept = "image/jpg,image/jpeg,image/png,application/*",
		maxSize,
		onChange,
		isError,
		helpText,
		errorMessage,
		viewOnly,
		noMargin,
	}) => {
		defaultFile =
			!(defaultFile instanceof File) && !defaultFile?.previewUrl
				? null
				: defaultFile;
		const [fileValue, setFileValue] = useState<File | IFile | null | undefined>(
			file || defaultFile
		);
		const isInit = useRef<boolean>(true);
		const fileRef = useRef<any>();

		useEffect(() => {
			if (!isInit.current) {
				setFileValue(file);
			} else isInit.current = false;
		}, [file, isInit]);

		const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			let f = e.target.files?.[0] || null;
			if (f && maxSize) {
				if (convertByteToMB(f?.size) > maxSize) {
					e.target.files = null;
					f = null;
					isError = true;
					toast.warning(`ফাইলের সর্বোচ্চ সাইজ ${numEnToBn(maxSize)} এমবি`);
				}
			}
			setFileValue(f || null);
			onChange && onChange(f || null, name || null);
		};

		const onCancle = () => {
			setFileValue(null);
			fileRef.current.files = null;
			onChange && onChange(null, name || null);
		};

		if ((fileValue && !isObjectNull(fileValue)) || fileValue instanceof File)
			return (
				<div
					className={clsx("fv-row fv-plugins-icon-container", {
						"mb-6": !noMargin,
					})}
				>
					{label ? (
						<label className="d-block fw-semibold fs-5">
							<span className={clsx([{ required: isRequired }])}>{label}</span>
						</label>
					) : null}

					<div className="image-input w-100" data-kt-image-input="true">
						<MediaPreview file={fileValue}>
							<div
								className={clsx(
									"d-flex align-items-center image-input-wrapper text-hover-primary border border-2 shadow-none w-100 h-35px",
									{ "bg-light": disabled },
									{ "border-0": !isObjectNull(viewOnly) }
								)}
								title={
									fileValue instanceof File
										? fileValue?.name
										: fileValue?.originalFileName
								}
							>
								<img
									src="/media/svg/files/attachment.svg"
									alt="."
									loading="lazy"
									style={{ height: "80%" }}
								/>
								<span
									className={clsx("d-inline-block text-truncate ms-1 mw-75", {
										"text-muted": disabled,
										"mw-100 fs-5 fw-bold text-gray-800 text-hover-primary": !isObjectNull(viewOnly),
									})}
								>
									{fileValue instanceof File
										? fileValue?.name
										: fileValue?.originalFileName}
								</span>
							</div>
						</MediaPreview>
						{disabled || !isObjectNull(viewOnly) ? null : (
							<>
								<label
									className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
									data-kt-image-input-action="change"
									data-bs-toggle="tooltip"
									aria-label="Change image"
									data-bs-original-title="Change image"
									data-kt-initialized="1"
								>
									<Icon icon="edit" />
									<input
										type="file"
										disabled={disabled}
										name="avatar"
										accept={accept}
										ref={fileRef}
										onChange={onFileChange}
									/>
									<input
										type="hidden"
										name="avatar_remove"
										disabled={disabled}
									/>
								</label>

								<span
									className={clsx(
										"btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow",
										{ "d-flex": !!fileValue }
									)}
									data-kt-image-input-action="cancel"
									data-bs-toggle="tooltip"
									aria-label="Cancel image"
									data-bs-original-title="Cancel image"
									data-kt-initialized="1"
									onClick={onCancle}
								>
									<Icon icon="close" />
								</span>
							</>
						)}
					</div>
					{isError && isObjectNull(viewOnly) ? (
						<div className="fv-plugins-message-container invalid-feedback">
							{errorMessage}
						</div>
					) : null}
				</div>
			);

		const fv =
			fileValue instanceof Object && isObjectNull(fileValue) ? "" : fileValue;

		return (
			<Input
				label={label}
				isRequired={isRequired as boolean}
				disabled={disabled}
				name={name}
				type="file"
				accept={accept}
				value={(fv as any) || ""}
				onChange={onFileChange}
				isError={isError}
				errorMessage={errorMessage}
				helpText={
					helpText ||
					(maxSize ? `ফাইলের সর্বোচ্চ সাইজ ${numEnToBn(maxSize)} এমবি` : "")
				}
			/>
		);
	}
);

const SingleFile: FC<SingleFileProps> = ({ control, ...props }) => {
	if (!control) return <FileUpload {...props} />;

	const { isRequired, name, defaultFile, onChange } = props;

	const df =
		!(defaultFile instanceof File) && !defaultFile?.previewUrl
			? null
			: defaultFile;

	return (
		<Controller
			control={control}
			name={name as string}
			defaultValue={df}
			rules={{ required: isRequired }}
			render={({ field }) => {
				if (
					!(field?.value instanceof File) &&
					field?.value instanceof Object &&
					!field?.value?.previewUrl
				)
					field.onChange(null);

				return (
					<FileUpload
						{...props}
						defaultFile={null}
						file={field?.value}
						onChange={(f, n) => {
							field.onChange(f);
							onChange && onChange(f, n);
						}}
					/>
				);
			}}
		/>
	);
};

export { SingleFile };
