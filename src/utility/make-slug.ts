import { IFile } from "@interface/common.interface";

export const ENV_VAR = {
  //@ts-ignore
  PUBLIC_URL: import.meta.env?.BASE_URL,
  //@ts-ignore
  GATEWAY: import.meta.env?.VITE_GATEWAY,
  //@ts-ignore
  ENV_TYPE: import.meta.env?.VITE_ENV_TYPE,
};

export const makeSlug = (str: string = "") => {
  str = str?.trim();
  str = str?.toLowerCase();
  str = str
    // eslint-disable-next-line
    ?.replace(/[_!`'"#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]/g, "")
    ?.replace(/\s+/g, "-") // collapse whitespace and replace by -
    ?.replace(/-+/g, "-"); // collapse dashes

  if (str.charAt(0) === "-") str = str.slice(1);
  if (str?.charAt(str?.length - 1) === "-") str = str?.slice(0, -1);
  return str;
};

export const makeEnSlug = (str: string = "") => {
  str = str?.replace(/^\s+|\s+$/g, ""); // trim
  str = str?.toLowerCase();
  str = str
    ?.replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    ?.replace(/\s+/g, "-") // collapse whitespace and replace by -
    ?.replace(/-+/g, "-"); // collapse dashes
  if (str.charAt(0) === "-") str = str.slice(1);
  if (str?.charAt(str?.length - 1) === "-") str = str?.slice(0, -1);
  return str;
};

export const toAbsoluteUrl = (pathname: string) => {
  const envPublicPath = ENV_VAR.PUBLIC_URL;
  return envPublicPath === "/" ? pathname : envPublicPath + pathname;
};

export const makePreviewUrl = (path: string | IFile | File) => {
  if (path instanceof File) return URL.createObjectURL(path);

  if (typeof path === "string" && path.startsWith("blob:http")) return path;
  else if (
    typeof path !== "string" &&
    path?.previewUrl?.startsWith("blob:http")
  )
    return path?.previewUrl;

  return "";
};
