import Icon from "@components/Icon";
import Thumb from "@components/Thumb";
import clsx from "clsx";
import { toAbsoluteUrl } from "utility/make-slug";
import { useLayout } from "../../core";
import HeaderUserMenu from "./header-menus/HeaderUserMenu";
import { toast } from "@services/utils/toast";
import { LocalStorageService } from "@services/utils/localStorage.service";

const itemClass = "ms-1 ms-lg-3";
const btnIconClass = "svg-icon-1";

const Navbar = () => {
  const { config } = useLayout();
  const logout = () => {
    toast.success("Logout Success");
    LocalStorageService.clear();
    window.location.reload();
  };
  return (
    <div className="app-navbar flex-shrink-0">
      <div className={clsx("app-navbar-item", itemClass)}>
        <div
          className="cursor-pointer"
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach="parent"
          data-kt-menu-placement="bottom-end"
        >
          <Thumb
            label="user-image"
            imgSrc={toAbsoluteUrl("/media/avatars/blank.png")}
          />
        </div>
        <HeaderUserMenu logout={logout} />
      </div>

      {config.app?.header?.default?.menu?.display && (
        <div
          className="app-navbar-item d-lg-none ms-2 me-n3"
          title="Show header menu"
        >
          <div
            className="btn btn-icon btn-active-color-primary w-35px h-35px"
            id="kt_app_header_menu_toggle"
          >
            <Icon icon="format_align_left" size={25} className={btnIconClass} />
          </div>
        </div>
      )}
    </div>
  );
};

export { Navbar };
