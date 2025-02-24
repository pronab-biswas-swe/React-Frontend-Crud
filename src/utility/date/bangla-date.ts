import { numEnToBn } from '../translator';
import { banglaMonths, getDayBD, getMonthBD } from './_helper';
import { makeBDLocalTime } from './split-date';

export function generateBanglaDate(date: Date | number | string, format: string = 'DD MMMM YYYY') {
	const inputDate = makeBDLocalTime(date);
	inputDate.setTime(inputDate.getTime() + (inputDate.getTimezoneOffset() + 360) * 60 * 1000);
	const day = inputDate.getDate();
	const month = inputDate.getMonth();
	const year = inputDate.getFullYear();

	let formattedDate = format.replace(/DD/gi, (fmt) => {
		const banglaDay = getDayBD(day, month, year);
		let d = banglaDay.toString();
		return d.length === 1 ? `0${d}` : d;
	});

	formattedDate = formattedDate.replace(/MMMM|MM|M/gi, (fmt) => {
		const bm = getMonthBD(day, month);
		let m = (bm + 1).toString();
		switch (fmt) {
			case 'M':
				return numEnToBn(m);
			case 'MM':
				m = m.length === 1 ? `0${m}` : m;
				return numEnToBn(m);
			default:
				return banglaMonths[bm];
		}
	});

	formattedDate = formattedDate.replace(/YYYY/gi, (fmt) => {
		let banglaYear = year - 593;
		if (month < 3 || (month === 3 && day < 14)) {
			banglaYear = year - 594;
		}
		return banglaYear?.toString();
	});

	return numEnToBn(formattedDate);
}
