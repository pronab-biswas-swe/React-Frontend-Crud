import FrontendPagination from "@components/FrontendPagination";
import {
  ITableHeadColumn,
  Table,
  TableCell,
  TableRow,
} from "@components/Table";
import { IObject } from "@interface/common.interface";
import { FC, useState } from "react";
import { generateRowNumBn } from "utility/utils";

const columns: ITableHeadColumn[] = [
  { title: "SL No", minWidth: 50 },
  { title: "Name", minWidth: 200 },
  { title: "Email", minWidth: 100 },
  { title: "Phone", minWidth: 100 },
  { title: "Role", minWidth: 100 },
  { title: "Location", minWidth: 75 },
  // { title: "Image", minWidth: 75 },
  // { title: "Actions", align: "end" },
];

type UserTableProps = {
  listData?: IObject[];
};

const UserTable: FC<UserTableProps> = ({ listData }) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page

  // Calculate total pages
  const totalPages = Math.ceil(listData.length / itemsPerPage);

  // Get paginated data
  const paginatedData = listData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page and items per page change
  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  if (!listData?.length) return;
  return (
    <>
      <Table columns={columns} tableHover>
        {paginatedData?.map((listData, i) => {
          return (
            <TableRow key={i}>
              <TableCell text={generateRowNumBn(i)} />
              <TableCell text={listData?.name || "Not Assign"} />
              <TableCell text={listData?.email || 0} />
              <TableCell text={listData?.phone || "Not Assign"} />
              <TableCell text={listData?.role || "Not Assign"} />
              <TableCell text={listData?.location || "Not Assign"} />
              {/* <TableCell
                hasImg
                imgSrc={
                  listData?.profile_image ||
                  toAbsoluteUrl("media/avatars/employee1.png")
                }
              />
              <TableCell isActive={listData?.isActive || false} /> */}
              {/* <TableCell textAlign="end"> */}
              {/* <Dropdown
                  btnIcon={true}
                  btnContent={<Icon icon="more_vert" size={20} />}
                >
                  <DropdownItem
                    onClick={() => {
                      handleUpdate(listData);
                    }}
                  >
                    <Icon size={19} icon="edit" />
                    <h6 className="mb-0 ms-3">Edit</h6>
                  </DropdownItem>

                  <DropdownItem
                    onClick={() => {
                      handleDelete(listData);
                    }}
                  >
                    <Icon size={19} icon="delete" color="danger" />
                    <h6 className="mb-0 ms-3 text-danger">Delete</h6>
                  </DropdownItem>
                </Dropdown> */}
              {/* </TableCell> */}
            </TableRow>
          );
        })}
      </Table>

      {/* Pagination Component */}
      <FrontendPagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </>
  );
};

export default UserTable;
