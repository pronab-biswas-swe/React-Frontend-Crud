import IconButton from "@components/IconButton";
import { IColors } from "@interface/common.interface";
import { EMAIL_REGEX, notNullOrUndefined } from "utility/check-validation";

type IDirectMailProps = {
  email: any;
  className?: string;
  color?: IColors;
  iconClassName?: string;
  iconSize?: number;
};

export const DirectMail = ({
  email,
  className,
  color = "dark",
  iconClassName,
  iconSize = 16,
}: IDirectMailProps) => {
  let regexp = new RegExp(EMAIL_REGEX),
    validEmail = regexp.test(email);
  return validEmail ? (
    <>
      {email}
      &nbsp;&nbsp;
      <a
        className={`text-${color} fs-6 ${className || ""}`}
        href={"mailto:" + email || ""}
        title="এই ঠিকানায় মেইল করতে এখানে চাপুন"
      >
        <IconButton
          iconVariant="outlined"
          hoverTitle="এই ঠিকানায় মেইল করতে এখানে চাপুন"
          iconName="forward_to_inbox"
          iconSize={iconSize}
          color={"warning"}
          rounded="pill"
          className={iconClassName || ""}
        />
      </a>
    </>
  ) : notNullOrUndefined(email) ? (
    <label>{email}</label>
  ) : (
    <label>{"Not Assign"}</label>
  );
};
