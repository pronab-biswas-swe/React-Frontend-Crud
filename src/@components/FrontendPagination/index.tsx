import { FC } from "react";
import { Pagination, Form } from "react-bootstrap";
import "./pagination.scss"

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

const FrontendPagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center mt-3">
      <Pagination className="mb-0">
        <Pagination.Prev
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
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
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          style={{ width: "100px" }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </Form.Select>
      </Form.Group>
    </div>
  );
};

export default FrontendPagination;
