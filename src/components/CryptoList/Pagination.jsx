import React from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const pageNumber = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex items-center justify-center my-4">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
        className="mx-2 px-2 py-1 bg-primary text-white"
      >
        &lt;
      </button>

      {pageNumber.map((pageNumber) => {
        if (pageNumber === 3 || pageNumber === totalPages) {
          return (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={`mx-2 px-2 py-1 hover:bg-primary hover:text-white ${
                currentPage === pageNumber
                  ? "bg-primary text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {pageNumber}
            </button>
          );
        } else if (
          pageNumber >= currentPage - 1 &&
          pageNumber <= currentPage + 1
        ) {
          return (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={`mx-2 px-2 py-1 hover:bg-primary hover:text-white ${
                currentPage === pageNumber
                  ? "bg-primary text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {pageNumber}
            </button>
          );
        } else if (
          (pageNumber === currentPage + 2 && currentPage < totalPages - 3) ||
          (pageNumber === currentPage - 2 && currentPage > 4)
        ) {
          return <span key={pageNumber}>...</span>;
        }
        return null;
      })}

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Próxima página"
        className="mx-2 px-2 py-1 bg-primary text-white"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
