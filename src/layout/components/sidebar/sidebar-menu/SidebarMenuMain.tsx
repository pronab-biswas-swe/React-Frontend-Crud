import { EMPLOYEE } from "@constants/internal-route.constant";
import { SidebarMenuItem } from "./SidebarMenuItem";

const SidebarMenuMain = () => {
  return (
    <>
      <SidebarMenuItem to={EMPLOYEE} title="Employee" fontIcon="group" />
    </>
  );
};

export { SidebarMenuMain };
