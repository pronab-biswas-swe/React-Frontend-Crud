export const numEnToBn = (num: any) => {
	return num
		?.toString()
		.replaceAll('0', '০')
		.replaceAll('1', '১')
		.replaceAll('2', '২')
		.replaceAll('3', '৩')
		.replaceAll('4', '৪')
		.replaceAll('5', '৫')
		.replaceAll('6', '৬')
		.replaceAll('7', '৭')
		.replaceAll('8', '৮')
		.replaceAll('9', '৯')
		.replaceAll('AM', 'এ এম')
		.replaceAll('PM', 'পি এম')
		.replaceAll('Jan', 'জানুয়ারি')
		.replaceAll('Feb', 'ফেব্রুয়ারি')
		.replaceAll('Mar', 'মার্চ')
		.replaceAll('Apr', 'এপ্রিল')
		.replaceAll('May', 'মে')
		.replaceAll('Jun', 'জুন')
		.replaceAll('Jul', 'জুলাই')
		.replaceAll('Aug', 'আগস্ট')
		.replaceAll('Sep', 'সেপ্টেম্বর')
		.replaceAll('Oct', 'অক্টোবর')
		.replaceAll('Nov', 'নভেম্বর')
		.replaceAll('Dec', 'ডিসেম্বর')
		.replaceAll('Years', 'বছর')
		.replaceAll('Months', 'মাস')
		.replaceAll('Days', 'দিন')
		.replaceAll('Sat', 'শনিবার')
		.replaceAll('Sun', 'রবিবার')
		.replaceAll('Mon', 'সোমবার')
		.replaceAll('Tue', 'মঙ্গলবার')
		.replaceAll('Wed', 'বুধবার')
		.replaceAll('Thu', 'বৃহস্পতিবার')
		.replaceAll('Fri', 'শুক্রবার');
};

export const numBnToEn = (num: any) => {
	return num
		? num
				.toString()
				.replaceAll('০', '0')
				.replaceAll('১', '1')
				.replaceAll('২', '2')
				.replaceAll('৩', '3')
				.replaceAll('৪', '4')
				.replaceAll('৫', '5')
				.replaceAll('৬', '6')
				.replaceAll('৭', '7')
				.replaceAll('৮', '8')
				.replaceAll('৯', '9')
		: num;
};

export const durationEnToBn = (dur: string) => {
	if (dur) {
		// i.e. - periodDate : "0 Years 0 Months 10 Days "
		let y = parseInt(dur.split(' Years ')[0]);
		let m = parseInt(dur.split(' Years ')[1].split(' Months ')[0]);
		let d = parseInt(dur.split(' Months ')[1].split(' Days ')[0]);
		return (
			(y > 0 ? numEnToBn(y) + ' বছর ' : '') +
			(m > 0 ? numEnToBn(m) + ' মাস ' : '') +
			(d > 0 ? numEnToBn(d) + ' দিন ' : '')
		);
	}
	return dur;
};

export const prepareDuration = (data: string) => {
	let y = data ? parseInt(data.split('-')[0]) : 0;
	let m = data ? parseInt(data.split('-')[1]) : 0;
	let d = data ? parseInt(data.split('-')[2]) : 0;
	return numEnToBn((y > 0 ? y + ' বছর ' : '') + (m > 0 ? m + ' মাস ' : '') + (d > 0 ? d + ' দিন' : ''));
};
