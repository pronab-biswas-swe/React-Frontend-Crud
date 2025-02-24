import Icon from "@components/Icon";
import { Input } from "@components/Input";
import { IObject } from "@interface/common.interface";
import clsx from "clsx";
import { FC, memo, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { numEnToBn } from "utility/textMapping";

type MultipleFileProps = {
	label?: string;
	name?: string;
	control?: any;
	isRequired?: boolean | string;
	disabled?: boolean;
	defaultFiles?: Array<File | IObject> | null;
	files?: Array<File | IObject> | null;
	accept?: string;
	maxSize?: number; // Size in MB
	helpText?: string;
	onChange?: (
		fileValue: FileList | IObject[] | null,
		name: string | null
	) => void;
	isError?: boolean;
	errorMessage?: string;
};

const FileUpload: FC<MultipleFileProps> = memo(
	({
		label,
		name,
		isRequired,
		disabled,
		defaultFiles,
		files,
		accept = "image/*,application/*",
		maxSize,
		onChange,
		isError,
		helpText,
		errorMessage,
	}) => {
		const [fileValue, setFileValue] = useState<FileList>();
		// const isInit = useRef<boolean>(true);
		const fileRef = useRef<any>();

		// useEffect(() => {
		// 	if (!isInit.current) {
		// 		setFileValue(files);
		// 	} else isInit.current = false;
		// }, [files, isInit]);

		const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			let nfl = e.target.files;
			// if (f && maxSize) {
			// 	if (convertByteToMB(f?.size) > maxSize) {
			// 		e.target.files = null;
			// 		f = null;
			// 		isError = true;
			// 		toast.warning(`ফাইলের সর্বোচ্চ সাইজ ${numEnToBn(maxSize)} এমবি`);
			// 	}
			// }
			const dt = new DataTransfer();
			Array.from(fileValue || []).forEach((f) => dt.items.add(f));
			Array.from(nfl || []).forEach((f) => dt.items.add(f));
			fileRef.current.files = dt.files;
			setFileValue(dt.files);
			onChange && onChange(dt.files, name || null);
		};

		const onCancle = (idx: number) => {
			const dt = new DataTransfer();
			Array.from(fileValue || []).forEach(
				(f, i) => i !== idx && dt.items.add(f)
			);
			setFileValue(dt.files);
			fileRef.current.files = dt.files;
			onChange && onChange(dt.files, name || null);
		};

		return (
			<>
				<Input
					label={label}
					isRequired={isRequired as boolean}
					disabled={disabled}
					name={name}
					type="file"
					accept={accept}
					noMargin
					isMultiple
					inputRef={fileRef}
					onChange={onFileChange}
					isError={isError}
					errorMessage={errorMessage}
					helpText={
						helpText ||
						(maxSize ? `ফাইলের সর্বোচ্চ সাইজ ${numEnToBn(maxSize)} এমবি` : "")
					}
				/>
				<div
					className={clsx("mb-4", {
						"border border-3 rounded": !!fileValue?.length,
					})}
				>
					{!!fileValue?.length &&
						Array.from(fileValue).map((_, idx) => {
							const fv = fileValue[idx];
							return (
								<div
									className="fv-row mt-2 fv-plugins-icon-container"
									key={idx}
								>
									<div className="image-input w-100" data-kt-image-input="true">
										<div
											className="image-input-wrapper border border-2 shadow-none w-100 h-35px"
											role="button"
											onClick={() =>
												window.open(
													URL.createObjectURL(fv as File),
													// : makePreviewUrl(fileValue?.previewUrl),
													"_blank"
												)
											}
											title={
												(fv instanceof File && fv?.name) || ""
												// : fileValue?.originalFileName
											}
										>
											<img
												src="/media/svg/files/upload.svg"
												alt="."
												loading="lazy"
												style={{ height: "100%" }}
											/>
											<span
												className={clsx(
													"d-inline-block text-truncate ms-2 mw-75",
													{ "text-muted": disabled }
												)}
												style={{ verticalAlign: "middle" }}
											>
												{
													fv instanceof File && fv?.name
													// : fileValue?.originalFileName
												}
											</span>
										</div>
										{disabled ? null : (
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
												onClick={() => onCancle(idx)}
												style={{ top: 18 }}
											>
												<Icon icon="close" />
											</span>
										)}
									</div>
								</div>
							);
						})}
				</div>
			</>
		);
	}
);

const MultipleFile: FC<MultipleFileProps> = ({ control, ...props }) => {
	if (!control) return <FileUpload {...props} />;

	const { isRequired, name, defaultFiles, onChange } = props;

	const df = !(defaultFiles instanceof FileList) ? null : defaultFiles;

	return (
		<Controller
			control={control}
			name={name as string}
			defaultValue={df}
			rules={{ required: isRequired }}
			render={({ field }) => {
				// if (
				// 	!(field?.value instanceof File) &&
				// 	field?.value instanceof Object &&
				// 	!field?.value?.previewUrl
				// )
				// 	field.onChange(null);

				return (
					<FileUpload
						{...props}
						defaultFiles={null}
						files={field?.value}
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

export { MultipleFile };
