import IconButton from '@components/IconButton';
import { ISizes } from '@interface/common.interface';
import { FC, useEffect, useState } from 'react';
import ReactDatePicker, { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { range } from 'utility/random-generate';
import './style.scss';
import { generateDateFormat, makeBDLocalTime, makeTwoDigit } from 'utility/splitDate';
import { DATE_PATTERN } from '@constants/common.constant';

const getMonth = (date: Date) => date.getMonth();
const getYear = (date: Date) => date.getFullYear();

const Calender: FC<ReactDatePickerCustomHeaderProps> = ({
	date,
	changeYear,
	changeMonth,
	decreaseMonth,
	increaseMonth,
	prevMonthButtonDisabled,
	nextMonthButtonDisabled,
}) => {
	const years = range(1900, getYear(new Date()) + 5, 1);
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	return (
		<div className='d-flex justify-content-center m-3'>
			<IconButton
				onClick={decreaseMonth}
				isDisabled={prevMonthButtonDisabled}
				iconName='navigate_before'
			/>
			<select
				className='form-control form-control-sm'
				value={months[getMonth(date)]}
				onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
			>
				{months.map((option) => (
					<option
						key={option}
						value={option}
					>
						{option}
					</option>
				))}
			</select>

			<select
				className='form-control form-control-sm'
				value={getYear(date)}
				onChange={({ target: { value } }) => changeYear(+value)}
			>
				{years.map((option) => (
					<option
						key={option}
						value={option}
					>
						{option}
					</option>
				))}
			</select>

			<IconButton
				onClick={increaseMonth}
				isDisabled={nextMonthButtonDisabled}
				iconName='navigate_next'
			/>
		</div>
	);
};

type IDateInputProps = {
	control?: any;
	onChange?: (val: { name: string; value: number | string | null }) => void;
	value?: any;
	name: string;
	placeholder?: string;
	size?: ISizes;
	variant?: 'solid' | 'outline';
	label?: string;
	minDate?: Date;
	maxDate?: Date;
	isRequired?: boolean | string;
	hasInfo?: boolean;
	infoText?: string;
	isError?: boolean;
	isValid?: boolean;
	errorMessage?: string;
	noMargin?: boolean;
	disabled?: boolean;
	className?: string;
	blockFutureDate?: boolean;
	isClearable?: boolean;
	helpText?: string;
	viewOnly?: string | number | Date;
};

const DateInput: FC<IDateInputProps> = ({
	control,
	name,
	size = 'sm',
	variant = 'outline',
	placeholder,
	onChange,
	value,
	label,
	maxDate,
	minDate,
	hasInfo,
	infoText,
	isRequired,
	className,
	disabled,
	errorMessage,
	isError,
	isValid,
	noMargin,
	blockFutureDate,
	helpText,
	viewOnly,
	isClearable = true,
}) => {
	const [dateValue, setDateValue] = useState<any>();

	useEffect(() => {
		setDateValue(value);
	}, [value]);

	const onDateSelect = (d: number | string | null) => {
		setDateValue(d);
		!!onChange && onChange({ name, value: d });
	};

	const DPComponent = ({
		onDateChange,
		date,
	}: {
		onDateChange: (d: number | string | null) => void;
		date: number;
	}) => (
		<ReactDatePicker
			placeholderText={placeholder || 'dd/mm/yyyy'}
			onChange={(d: Date) => {
				const dt = d?.toLocaleDateString('en-US').split('/');
				onDateChange(dt ? `${dt[2]}-${makeTwoDigit(dt[0])}-${makeTwoDigit(dt[1])}` : null);
			}}
			selected={date ? makeBDLocalTime(date) : null}
			popperPlacement='auto'
			isClearable={!disabled && isClearable}
			name={name}
			disabled={disabled}
			dateFormat='dd/MM/yyyy'
			minDate={minDate ? new Date(minDate) : null}
			maxDate={blockFutureDate ? new Date() : maxDate ? new Date(maxDate) : null}
			renderCustomHeader={Calender}
			customInput={
				<InputMask
					type='text'
					mask='99/99/9999'
				/>
			}
			className={`form-control form-control-${size} form-control-${variant} ${isError ? 'is-invalid' : ''} ${
				isValid ? 'is-valid' : ''
			}`}
		/>
	);

	return (
		<div className={`w-100 fv-row ${className || ''} ${noMargin ? '' : 'mb-6'}`}>
			{label ? (
				<label className='d-flex align-items-center fs-5'>
					<span className={isRequired ? 'required' : ''}>{label}</span>
					{hasInfo && (
						<i
							className='fas fa-exclamation-circle ms-2 fs-7'
							data-bs-toggle='tooltip'
							title={infoText}
						/>
					)}
				</label>
			) : null}
			{!!viewOnly ? (
				<span className='ms-2 fs-5 fw-bold text-gray-800'>
					{generateDateFormat(viewOnly, DATE_PATTERN.CASUAL)}
				</span>
			) : control ? (
				<Controller
					control={control}
					name={name}
					rules={{ required: isRequired }}
					render={({ field }: { field: any }) => (
						<DPComponent
							onDateChange={(dt) => {
								field.onChange(dt);
								!!onChange && onChange({ name, value: dt });
							}}
							date={field.value}
						/>
					)}
				/>
			) : (
				<DPComponent
					onDateChange={onDateSelect}
					date={dateValue}
				/>
			)}
			{isError && !viewOnly ? (
				<div className='invalid-feedback d-block'>{errorMessage}</div>
			) : !!helpText && !viewOnly ? (
				<div className='form-text text-gray-600'>{helpText}</div>
			) : null}
		</div>
	);
};

export { DateInput };
