import React, { ChangeEvent } from "react";

interface FilterSectionProps {
  filterStatus: string;
  filterDateFrom: string;
  filterDateTo: string;
  sortOption: string;
  setFilterStatus: (status: string) => void;
  setFilterDateFrom: (date: string) => void;
  setFilterDateTo: (date: string) => void;
  setSortOption: (option: string) => void;
  handleFilterApply: () => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  filterStatus,
  filterDateFrom,
  filterDateTo,
  sortOption,
  setFilterStatus,
  setFilterDateFrom,
  setFilterDateTo,
  setSortOption,
  handleFilterApply,
  showFilters,
  setShowFilters,
}) => {
  return (
    <>
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="mb-4 px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
      >
        {showFilters ? "Hide Filters & Sorting" : "Show Filters & Sorting"}
      </button>
      {showFilters && (
        <div className="mb-6">
          <label className="block mb-2">Filter by Status:</label>
          <select
            value={filterStatus}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setFilterStatus(e.target.value)
            }
            className="mb-4 p-2 border rounded-md border-gray-300 w-full"
          >
            <option value="">All</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <label className="block mb-2">Filter by Due Date:</label>
          <input
            type="date"
            value={filterDateFrom}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFilterDateFrom(e.target.value)
            }
            className="mb-4 p-2 border rounded-md border-gray-300 w-full"
          />
          <input
            type="date"
            value={filterDateTo}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFilterDateTo(e.target.value)
            }
            className="mb-4 p-2 border rounded-md border-gray-300 w-full"
          />

          <label className="block mb-2">Sort by:</label>
          <select
            value={sortOption}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setSortOption(e.target.value)
            }
            className="mb-4 p-2 border rounded-md border-gray-300 w-full"
          >
            <option value="due_date_asc">Due Date (Ascending)</option>
            <option value="due_date_desc">Due Date (Descending)</option>
            <option value="status_asc">Status (Ascending)</option>
            <option value="status_desc">Status (Descending)</option>
          </select>

          <button
            onClick={handleFilterApply}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      )}
    </>
  );
};

export default FilterSection;
