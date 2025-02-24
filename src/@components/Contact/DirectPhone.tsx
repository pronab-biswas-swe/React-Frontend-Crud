import IconButton from "@components/IconButton";
import { IColors } from "@interface/common.interface";
import { BD_PHONE_REGEX, notNullOrUndefined } from "utility/check-validation";
import { numEnToBn } from "utility/translator";

type IDirectPhoneProps = {
  phoneNo: any;
  className?: string;
  color?: IColors;
  iconClassName?: string;
  iconSize?: number;
};

export const DirectPhone = ({
  phoneNo,
  className,
  color = "dark",
  iconClassName,
  iconSize = 12,
}: IDirectPhoneProps) => {
  let regexp = new RegExp(BD_PHONE_REGEX),
    isPhoneNo = regexp.test(phoneNo);
  return isPhoneNo ? (
    <>
      {numEnToBn(phoneNo)}
      &nbsp;&nbsp;
      <a
        className={`text-${color} fs-6 ${className || ""}`}
        href={"tel:" + phoneNo || ""}
        title="এই নম্বরে ফোন করতে এখানে চাপুন"
      >
        <IconButton
          iconVariant="outlined"
          hoverTitle="এই নম্বরে ফোন করতে এখানে চাপুন"
          iconName="phone_in_talk"
          iconSize={iconSize}
          color={"success"}
          rounded="pill"
          className={iconClassName || ""}
        />
      </a>
    </>
  ) : notNullOrUndefined(phoneNo) ? (
    <label>{numEnToBn(phoneNo)}</label>
  ) : (
    <label>{"Not Assign"}</label>
  );
};
