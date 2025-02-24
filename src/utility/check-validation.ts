import { IObject } from "@interface/common.interface";

const ALPHANUMERIC = /^[a-zA-Z0-9]+$/;
const DECIMAL_NUMERIC_REGEX = /^(\d+)?(\.)?(\d{0,2})?$/; // Ex: 123, '123'
const BN_EN_NUMERIC_REGEX = /^[\d\u09E6-\u09EF]+$/; // Ex: 123, '123', '১২৩'
const BN_EN_DECIMAL_NUMERIC_REGEX =
  /^(\.|[0-9\u09E6-\u09EF]+(\.[0-9\u09E6-\u09EF]+)?)$/; // Ex: 123, '12.3', '১২.৩'
const BD_PHONE_REGEX = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
// const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const EN_SP_TEXT_REGEX = /^[A-Za-z0-9_!@#$&()\\-`.+,/"'\-\s+]+$/;

const isValidUrl = (url: string) => {
  url = url.trim();
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!pattern.test(url);
};

function checkIsActive(pathname: string, url: string) {
  const current = pathname.split(/[?#]/)[0];
  if (!current || !url) {
    return false;
  }
  if (current === url) {
    return true;
  }
  if (current.indexOf(url) > -1) {
    return true;
  }
  return false;
}

const checkRequiredFiles = (
  data: any,
  fields: Array<string | Array<string> | (string & Array<string>)>
) => {
  const returnObj: IObject = { hasError: true, fields: [] };
  fields.forEach((f) => {
    if (f instanceof Array) {
      // 1st index should be file sender property and 2nd index will be receiver property
      if (
        !(data?.[f[0]] instanceof File) &&
        (!data?.[f[1]] || !Object.keys(data?.[f[1]])?.length)
      ) {
        returnObj.fields.push(f[0]);
      } else if (data?.[f[0]] instanceof File) {
        data[f[1]] = null;
      }
    } else {
      if (
        !(data?.[f] instanceof File) &&
        (!data?.[f] || !Object.keys(data?.[f])?.length)
      ) {
        returnObj.fields.push(f);
      }
    }
  });
  returnObj.hasError = !!returnObj.fields.length;
  return returnObj;
};

const isFormValueChanged = (
  initValues: IObject,
  currentValues: IObject,
  dirtyFields: IObject
) => {
  let isChanged: boolean = false;
  Object.keys(dirtyFields).forEach((df) => {
    if (isChanged) return;
    const cv = currentValues?.[df] || null;
    let iv = initValues?.[df] || null;
    if (typeof iv === "object" && isObjectNull(iv)) iv = null;
    if (typeof cv === "object") {
      isChanged = JSON.stringify(cv) !== JSON.stringify(iv);
      return;
    } else if (notNullOrUndefined(cv) && notNullOrUndefined(iv)) {
      isChanged = cv?.toString() !== iv?.toString();
      return;
    }
    isChanged = cv !== iv;
  });
  return isChanged;
};

const isObjectNull = (object: IObject | null | undefined) =>
  !Object.keys(object || {})?.length;

const isListNull = (
  li: Array<IObject | string | number | null | undefined> | null | undefined
) => !li || li?.length <= 0;

const isFileImg = (extension: string) => {
  extension = extension.toLocaleLowerCase();
  return (
    extension === "png" ||
    extension === "jpg" ||
    extension === "jpeg" ||
    extension === "image/png" ||
    extension === "image/jpg" ||
    extension === "image/jpeg"
  );
};

const isFilePdf = (extension: string) => {
  extension = extension?.toLocaleLowerCase();
  return extension === "pdf" || extension === "application/pdf";
};

const notNullOrUndefined = (data: string | number) =>
  !(
    data === null ||
    data === undefined ||
    data === "null" ||
    data === "undefined" ||
    data === ""
  );

const alphanumericCheck = (val: string) => {
  return notNullOrUndefined(val)
    ? ALPHANUMERIC.test(val)
      ? true
      : "শুধুমাত্র আলফানিউমেরিক লিখুন"
    : true;
};

const bnCheck = (val: string) => {
  if (!notNullOrUndefined(val)) {
    return true;
  }

  let otherThanBnFound = false;
  for (let i = 0; i < val.length; i++) {
    otherThanBnFound =
      (val.charCodeAt(i) < 2433 && notSpclChar(val.charCodeAt(i))) ||
      val.charCodeAt(i) > 2554;
  }

  return otherThanBnFound ? "বাংলায় লিখুন" : true;
};

const notSpclChar = (val: number) => {
  return (
    val !== 32 &&
    val !== 35 &&
    val !== 36 &&
    val !== 37 &&
    val !== 38 &&
    val !== 40 &&
    val !== 41 &&
    val !== 42 &&
    val !== 43 &&
    val !== 45 &&
    val !== 46 &&
    val !== 64 &&
    val !== 95
  );
};

const emailCheck = (val: string) => {
  return notNullOrUndefined(val)
    ? EMAIL_REGEX.test(val)
      ? true
      : "ই-মেইল টি সঠিক নয়"
    : true;
};

const phoneCheck = (val: string) => {
  return notNullOrUndefined(val)
    ? BD_PHONE_REGEX.test(val)
      ? true
      : "ফোন নাম্বারটি সঠিক নয়"
    : true;
};

export {
  alphanumericCheck,
  BD_PHONE_REGEX,
  BN_EN_DECIMAL_NUMERIC_REGEX,
  BN_EN_NUMERIC_REGEX,
  bnCheck,
  checkIsActive,
  checkRequiredFiles,
  DECIMAL_NUMERIC_REGEX,
  EMAIL_REGEX,
  emailCheck,
  isFileImg,
  isFilePdf,
  isFormValueChanged,
  isListNull,
  isObjectNull,
  isValidUrl,
  notNullOrUndefined,
  phoneCheck,
};
