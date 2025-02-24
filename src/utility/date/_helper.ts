export const banglaMonths = [
  "বৈশাখ",
  "জ্যৈষ্ঠ",
  "আষাঢ়",
  "শ্রাবণ",
  "ভাদ্র",
  "আশ্বিন",
  "কার্তিক",
  "অগ্রহায়ণ",
  "পৌষ",
  "মাঘ",
  "ফাল্গুন",
  "চৈত্র",
];

export function getMonthBD(day: number, month: number): number {
  let result: number;

  switch (true) {
    case (month === 4 && day > 14) || (month === 5 && day < 15):
      result = 1;
      break;
    case (month === 5 && day > 14) || (month === 6 && day < 16):
      result = 2;
      break;
    case (month === 6 && day > 15) || (month === 7 && day < 16):
      result = 3;
      break;
    case (month === 7 && day > 15) || (month === 8 && day < 16):
      result = 4;
      break;
    case (month === 8 && day > 15) || (month === 9 && day < 17):
      result = 5;
      break;
    case (month === 9 && day > 16) || (month === 10 && day < 16):
      result = 6;
      break;
    case (month === 10 && day > 15) || (month === 11 && day < 16):
      result = 7;
      break;
    case (month === 11 && day > 15) || (month === 0 && day < 15):
      result = 8;
      break;
    case (month === 0 && day > 14) || (month === 1 && day < 14):
      result = 9;
      break;
    case (month === 1 && day > 13) || (month === 2 && day < 15):
      result = 10;
      break;
    case (month === 2 && day > 14) || (month === 3 && day < 14):
      result = 11;
      break;
    default:
      result = 0;
      break;
  }

  return result;
}

const isLeapYear = (year: number = 0): boolean =>
  year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;

export function getDayBD(day: number, month: number, year: number): number {
  let banglaDay: number;
  switch (month) {
    case 0:
      banglaDay = day < 15 ? day + 16 : day - 14;
      break;
    case 1:
      banglaDay = day < 14 ? day + 17 : day - 13;
      break;
    case 2:
      if (isLeapYear(year)) {
        banglaDay = day < 15 ? day + 16 : day - 14;
      } else {
        banglaDay = day < 15 ? day + 15 : day - 14;
      }
      break;
    case 3:
      banglaDay = day < 14 ? day + 17 : day - 13;
      break;
    case 4:
      banglaDay = day < 15 ? day + 17 : day - 14;
      break;
    case 5:
      banglaDay = day < 15 ? day + 17 : day - 14;
      break;
    case 6:
      banglaDay = day < 16 ? day + 16 : day - 15;
      break;
    case 7:
      banglaDay = day < 16 ? day + 16 : day - 15;
      break;
    case 8:
      banglaDay = day < 16 ? day + 16 : day - 15;
      break;
    case 9:
      banglaDay = day < 17 ? day + 15 : day - 16;
      break;
    case 10:
      banglaDay = day < 16 ? day + 15 : day - 15;
      break;
    default:
      banglaDay = day < 16 ? day + 15 : day - 15;
      break;
  }
  return banglaDay;
}
