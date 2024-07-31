// Pagination.tsx
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ProductPagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center items-center mt-6">
      <button
        onClick={handlePrevPage}
        className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        className="px-4 py-2 bg-gray-300 rounded-lg ml-2"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default ProductPagination;
