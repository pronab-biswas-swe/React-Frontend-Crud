import { IObject } from "@interface/common.interface";

export const generateId = () => Math.floor(100000 + Math.random() * 900000);
export const generateUUID = () => crypto.randomUUID();

export const makeTwoDigit = (val: string) => {
  return val?.length < 2 ? "0" + val : val;
};

export const makeTwoDecimalPoint = (val: string) => {
  return val
    ? val.toString().split(".")[1]?.length < 2
      ? +val + "0"
      : val
    : null;
};

export const groupBy = (list: IObject[], keyGetter: (k: IObject) => string) => {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return Object.fromEntries(map.entries());
};

export const range = (
  start: number | string,
  end: number | string | any,
  step: number = 1
) => {
  var range = [];

  if (step === 0) {
    throw TypeError("Step cannot be zero.");
  }

  if (typeof start === "undefined" || typeof end === "undefined") {
    throw TypeError("Must pass start and end arguments.");
  } else if (typeof start !== typeof end) {
    throw TypeError("Start and end arguments must be of same type.");
  }

  typeof step === "undefined" && (step = 1);

  if (end < start) {
    step = -step;
  }

  if (typeof start === "number") {
    while (step > 0 ? end >= start : end <= start) {
      range.push(start);
      start += step;
    }
  } else if (typeof start === "string") {
    if (start.length !== 1 || end.length !== 1) {
      throw TypeError("Only strings with one character are supported.");
    }

    start = start.charCodeAt(0);
    end = end.charCodeAt(0);

    while (step > 0 ? end >= start : end <= start) {
      range.push(String.fromCharCode(start));
      start += step;
    }
  } else {
    throw TypeError("Only string and number types are supported");
  }

  return range;
};
