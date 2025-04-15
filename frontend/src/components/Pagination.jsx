import React from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="mt-4 flex justify-center space-x-2">
      <button 
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Prev
      </button>

      {[...Array(totalPages).keys()].map((num) => (
        <button 
          key={num + 1}
          onClick={() => setCurrentPage(num + 1)}
          className={`px-3 py-1 ${currentPage === num + 1 ? "bg-black text-white" : "bg-gray-200"} rounded cursor-pointer`}
        >
          {num + 1}
        </button>
      ))}

      <button 
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
