import { toAbsoluteUrl } from "utility/make-slug";

export const DATE_PATTERN = {
  STANDARD: "%dd%/%mm%/%yyyy%",
  CASUAL: "%dd% %MM%, %yyyy%",
};
export const DEFAULT_LINK = {
  ATTACHMENT_ICON: "/media/svg/files/attachment.svg",
  BLANK_IMG_ABSOLUTE: toAbsoluteUrl("/media/avatars/blank.png"),
  BLANK_IMG: "/media/avatars/blank.png",
};
