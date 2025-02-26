import { LocalStorageService } from "@services/utils/localStorage.service";
import { FC, ReactNode } from "react";
import { isObjectNull } from "utility/check-validation";

type ACLWrapperProps = {
  visibleCustom?: boolean; // pass a custom boolean value by conditional check
  visibleToRoles?: string[]; // pass role list to show ['APPROVER', 'REVIEWER']
  invisibleToRoles?: string[]; // pass role list to show ['APPROVER', 'REVIEWER']
  children?: ReactNode;
  showInstead?: ReactNode | string; // Show the block or text instead of the orginal content
};

// If 'visibleToRoles' and 'visibleCustom' both are true then the component will show
const ACLWrapper: FC<ACLWrapperProps> = ({
  visibleCustom = true,
  visibleToRoles,
  invisibleToRoles,
  children,
  showInstead,
}) => {
  const userRoles = !isObjectNull(LocalStorageService.get("user"))
    ? [LocalStorageService.get("user")?.role]
    : [];
  let hasPermission = visibleCustom;

  // handle role based permission
  if (invisibleToRoles?.length) {
    const hasRolePermission = userRoles?.some((ro) =>
      invisibleToRoles?.some((vt) => vt === ro)
    );
    hasPermission = !hasRolePermission && visibleCustom;
  }

  if (visibleToRoles?.length) {
    const hasRolePermission = userRoles?.some((ro) =>
      visibleToRoles?.some((vt) => vt === ro)
    );

    hasPermission = hasRolePermission && visibleCustom;
  }

  return hasPermission ? (
    <>{children}</>
  ) : showInstead ? (
    <>{showInstead}</>
  ) : null;
};

export default ACLWrapper;
