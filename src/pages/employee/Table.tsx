import { Dropdown, DropdownItem } from "@components/Dropdown";
import Icon from "@components/Icon";
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
import { Form, Pagination } from "react-bootstrap";

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

  // / Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page

  // Calculate total pages
  const totalPages = Math.ceil(listData.length / itemsPerPage);

  // Get paginated data
  const paginatedData = listData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle items per page change
  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  if (!listData?.length) return;
  return (
    <>
      <Table columns={columns}>
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
                <Dropdown
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
                </Dropdown>
              </TableCell>
            </TableRow>
          );
        })}
      </Table>

      {/* Pagination Component */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <Pagination className="mb-0">
          <Pagination.Prev
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          />
        </Pagination>

        {/* Items per page selection */}
        <Form.Group
          controlId="itemsPerPage"
          className="d-flex align-items-center"
        >
          <Form.Label className="me-2 mb-0">Items per page:</Form.Label>
          <Form.Select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            style={{ width: "100px" }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </Form.Select>
        </Form.Group>
      </div>
    </>
  );
};

export default EmployeeTable;
