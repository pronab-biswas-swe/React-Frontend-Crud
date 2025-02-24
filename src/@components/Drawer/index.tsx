import { ReactNode } from "react";
import DrawerHeader from "./DrawerHeader";

type DrawerProps = {
  title?: string | ReactNode;
  children: JSX.Element | JSX.Element[] | string;
  isOpen: boolean;
  handleClose?: () => void;
  className?: string;
  closeOnBackdropClick?: boolean;
};

export default ({
  title,
  className,
  children,
  isOpen,
  handleClose,
  closeOnBackdropClick = true,
}: DrawerProps) => {
  if (!isOpen) return null;
  return (
    <>
      <div
        className={`bg-body drawer drawer-end drawer-on w-100 w-md-50 w-xl-25 ${
          className || ""
        }`}
      >
        <div className="w-100">
          {title ? (
            <DrawerHeader
              title={title}
              closeIconAction={handleClose}
              backIconAction={handleClose}
            />
          ) : null}
          {children}
          {/* <DrawerBody>{children}</DrawerBody> */}
        </div>
      </div>
      <div
        className="drawer-overlay"
        style={{ zIndex: 109 }}
        onClick={() => closeOnBackdropClick && handleClose()}
      />
    </>
  );
};
