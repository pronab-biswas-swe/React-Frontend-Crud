import { EMPLOYEE, USERS } from "@constants/internal-route.constant";
import { SidebarMenuItem } from "./SidebarMenuItem";
import ACLWrapper from "@acl/ACLWrapper";

const SidebarMenuMain = () => {
  return (
    <>
      <SidebarMenuItem to={EMPLOYEE} title="Employee List" fontIcon="group" />
      <ACLWrapper visibleToRoles={["SUPER_ADMIN"]}>
        <SidebarMenuItem
          to={USERS}
          title="User List"
          fontIcon="admin_panel_settings"
        />
      </ACLWrapper>
    </>
  );
};

export { SidebarMenuMain };
