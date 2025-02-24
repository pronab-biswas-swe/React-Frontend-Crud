import FrontendPagination from "@components/FrontendPagination";
import IconButton from "@components/IconButton";
import {
  ITableHeadColumn,
  Table,
  TableCell,
  TableRow,
} from "@components/Table";
import { FC, useContext, useState } from "react";
import { toAbsoluteUrl } from "utility/make-slug";
import { generateRowNumBn } from "utility/utils";
import { EmployeeContext } from ".";

const columns: ITableHeadColumn[] = [
  { title: "SL No", minWidth: 50 },
  { title: "Name", minWidth: 200 },
  { title: "Salary", minWidth: 75 },
  { title: "Age", minWidth: 75 },
  { title: "Image", minWidth: 75 },
  { title: "Active", minWidth: 75 },
  { title: "Actions", align: "end" },
];

const EmployeeTable: FC = () => {
  const { listData, handleUpdate, handleDelete } = useContext(EmployeeContext);

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
              <TableCell text={listData?.employee_name || "Not Assign"} />
              <TableCell text={listData?.employee_salary || 0} />
              <TableCell text={listData?.employee_age} />
              <TableCell
                hasImg
                imgSrc={
                  listData?.profile_image ||
                  toAbsoluteUrl("media/avatars/employee1.png")
                }
              />
              <TableCell isActive={listData?.isActive || false} />
              <TableCell textAlign="end">
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
                <IconButton
                  iconName="edit"
                  onClick={() => {
                    handleUpdate(listData);
                  }}
                  color="warning"
                />
                <IconButton
                  iconName="delete"
                  className="ms-2"
                  onClick={() => {
                    handleDelete(listData);
                  }}
                  color="danger"
                />
              </TableCell>
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

export default EmployeeTable;
