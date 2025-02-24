import { IMetaSort } from "@interface/common.interface";
import { ITableHeadColumn, TableHead } from "./TableHead";
import clsx from "clsx";
import { ReactNode } from "react";

type TableProps = {
  columns?: ITableHeadColumn[];
  children?: ReactNode | ReactNode[];
  minHeight?: number;
  multiSort?: boolean;
  onSort?: (sortFields: IMetaSort[]) => void;
  tableHover?: boolean;
};

export const Table = ({
  columns,
  children,
  minHeight = 0,
  multiSort,
  onSort,
  tableHover,
}: TableProps) => {
  return (
    <div
      className={clsx(`overflow-auto animate__animated animate__fadeIn`, {
        [`min-h-${minHeight}px`]: !!minHeight,
      })}
    >
      <table
        className={clsx(
          "table table-row-bordered table-responsive table-row-gray-300 align-middle gs-0 gy-4",
          {
            "table-hover": tableHover,
          }
        )}
      >
        {columns ? (
          <TableHead columns={columns} multiSort={multiSort} onSort={onSort} />
        ) : null}
        {columns ? <tbody>{children}</tbody> : children}
      </table>
    </div>
  );
};
