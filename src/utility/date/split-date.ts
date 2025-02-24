import moment from 'moment';
import { numEnToBn } from '../translator';
import { makeTwoDigit } from 'utility/random-generate';

export const makeBDLocalTime = (date: string | number | Date): Date =>
	new Date(new Date(date).toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }));

export const splitDate = (dateString: string | number | Date = '') => {
	let date = makeBDLocalTime(dateString);
	const dateStr = date.toDateString().split(' ');
	const timeStr = date.toLocaleTimeString('en-US').split(':');
	return {
		day: dateStr[0],
		dd: dateStr[2],
		mm: String(date.getMonth() + 1),
		MM: dateStr[1],
		yyyy: dateStr[3],
		hour: timeStr[0],
		minute: timeStr[1],
		second: timeStr[2]?.split(' ')?.[0] || '',
		ampm: timeStr[2]?.split(' ')?.[1] || '',
	};
};

export const generateDateFormat = (
	date: string | number | Date,
	format: string,
	outputFormat?: 'en' | 'bn',
	blankValue?: string
) => {
	if (!date) return blankValue || '';
	const dateTime = splitDate(date);
	const output = format
		.replace('%day%', dateTime?.day || '')
		.replace('%dd%', dateTime?.dd || '0')
		.replace('%mm%', makeTwoDigit(dateTime?.mm) || '0')
		.replace('%MM%', dateTime?.MM || '0')
		.replace('%yyyy%', dateTime?.yyyy || '0')
		.replace('%hour%', makeTwoDigit(dateTime?.hour) || '0')
		.replace('%minute%', makeTwoDigit(dateTime?.minute) || '0')
		.replace('%second%', makeTwoDigit(dateTime?.second) || '0')
		.replace('%ampm%', dateTime?.ampm);
	return outputFormat === 'en' ? output : numEnToBn(output);
};

export const calculateDuration = (startDate: number | string | Date, endDate?: number | string | Date) => {
	let mStartDate: any = makeBDLocalTime(startDate).toLocaleDateString('en-US');
	let mEndDate: any = addRemoveDays(makeBDLocalTime(endDate || new Date())).toLocaleDateString('en-US'); // Count including end date

	mStartDate = moment(mStartDate, 'MM-DD-YYYY');
	mEndDate = moment(mEndDate, 'MM-DD-YYYY');

	var yearDuration = mEndDate.diff(mStartDate, 'year');
	mStartDate.add(yearDuration, 'years');

	var monthDuration = mEndDate.diff(mStartDate, 'months');
	mStartDate.add(monthDuration, 'months');

	var dayDuration = mEndDate.diff(mStartDate, 'days');

	let result = '';
	result = yearDuration > 0 ? result + yearDuration + ' বছর ' : result;
	result = monthDuration > 0 ? result + makeTwoDigit(monthDuration.toString()) + ' মাস ' : result;
	result =
		result.length > 0 && dayDuration === 0 ? result : result + makeTwoDigit(dayDuration.toString()) + ' দিন';

	return {
		fullResult: numEnToBn(
			`${yearDuration} বছর ${makeTwoDigit(monthDuration.toString())} মাস ${makeTwoDigit(
				dayDuration.toString()
			)} দিন`
		),
		shortResult: numEnToBn(result),
		years: yearDuration,
		months: makeTwoDigit(monthDuration.toString()),
		days: makeTwoDigit(dayDuration.toString()),
	};
};

export const addRemoveDays = (
	date: number | Date | string,
	days: number = 1,
	actionType: 'add' | 'remove' = 'add'
) => {
	date = date ? new Date(date as string | number) : new Date();
	return actionType === 'add'
		? new Date(date.getTime() + days * 24 * 60 * 60 * 1000)
		: new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
};

export const makeInputDateFormate = (date: number | Date) => {
	if (!date) return;
	date = date instanceof Date ? date : new Date(date);
	return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(
		-2
	)}`;
};

export const makeEndDate = (date: number | Date) => {
	const d = new Date(date);
	d.setHours(23, 59, 59); // Make end date by multipling 24 hours
	return d;
};

export const countdown = (countTime: number, setTime?: (timeLeft: number) => void, timeFrom?: number) => {
	const eTime = timeFrom ? new Date(timeFrom) : new Date();
	eTime.setSeconds(eTime.getSeconds() + countTime);
	let et = eTime.getTime();
	const interval = setInterval(() => {
		const cTime = new Date().getTime();
		if (et > cTime) {
			const timeLeft = new Date(et - cTime).getTime();
			setTime && setTime(timeLeft);
			return;
		}
		setTime && setTime(0);
		clearInterval(interval);
	}, 1000);
};
