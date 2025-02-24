import { ReactNode } from "react";

type TableBodyProps = {
  children?: ReactNode | ReactNode[];
};

export const TableBody = ({ children }: TableBodyProps) => {
  return <tbody>{children}</tbody>;
};
