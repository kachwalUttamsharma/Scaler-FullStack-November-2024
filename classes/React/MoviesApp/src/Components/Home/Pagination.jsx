import React from "react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ pageNo, handleNext, handlePrev }) => {
  return (
    <div className="flex justify-center items-center bg-gray-700 text-white p-3 rounded-lg shadow-md mt-4 gap-4">
      <button
        onClick={handlePrev}
        className="p-2 bg-gray-600 rounded-full hover:bg-gray-500"
      >
        <ChevronLeft />
      </button>
      <div className="text-lg font-semibold px-4">{pageNo}</div>
      <button
        onClick={handleNext}
        className="p-2 bg-gray-600 rounded-full hover:bg-gray-500"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
