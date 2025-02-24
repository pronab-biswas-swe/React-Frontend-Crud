/* eslint-disable react-hooks/rules-of-hooks */
import { IMeta, IObject } from "@interface/common.interface";
import UAParser from "ua-parser-js";
import { makeTwoDigit } from "./random-generate";
import { numEnToBn } from "./translator";

export const hexToRGB = (hexCode: string, a?: string) => {
  const r = parseInt(hexCode?.slice(1, 3), 16);
  const g = parseInt(hexCode?.slice(3, 5), 16);
  const b = parseInt(hexCode?.slice(5, 7), 16);

  if (a) {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
};

export const getLabelColors = (
  totalSubjects: number,
  hashCode: string
): any[] => {
  let labelColors = [];
  hashCode = "#" + hashCode;
  for (let i = 0; i < totalSubjects; i++) {
    labelColors.push(hashCode);
  }
  return labelColors;
};

export const arryEnToBn = (enArray, step: number = 1): any[] => {
  let arry = [];
  for (let i = 0; i < enArray.length; i++) {
    if (step === 1) {
      // no Intervals
      arry.push(numEnToBn(enArray[i]));
    } else {
      // Intervals inserted
      if (i % step === 0) {
        arry.push(numEnToBn(enArray[i]));
      } else {
        arry.push("");
      }
    }
  }
  return arry;
};

export const isFileImg = (extension: string) => {
  extension = extension?.toLocaleLowerCase();
  return (
    extension === "png" ||
    extension === "jpg" ||
    extension === "jpeg" ||
    extension === "image/png" ||
    extension === "image/jpg" ||
    extension === "image/jpeg"
  );
};

export const isFilePdf = (extension: string) => {
  extension = extension?.toLocaleLowerCase();
  return extension === "pdf" || extension === "application/pdf";
};

export const generateRowNumBn = (index: number, meta?: IMeta) => {
  const sl =
    meta?.limit && meta?.page ? meta.limit * meta.page + index + 1 : index + 1;
  return makeTwoDigit(sl.toString());
};

export const convertByteToMB = (bit: number) => bit / 1000000;

export const initPayloadMeta: IMeta = {
  page: 0,
  limit: 10,
  sort: [{ field: "createdOn", order: "desc" }],
};

export const payscaleFormatter = (year: any, grade: any, payscale: any) => {
  return year && grade
    ? numEnToBn(year) + " , " + grade + " , " + payscale
    : payscale;
};

export const getUserAgentDetails = (agent: any) => {
  return UAParser(agent);
};

export const getPromiseSuccessValue = (resp: IObject) =>
  resp?.status === "fulfilled" ? resp?.value?.body : [];
