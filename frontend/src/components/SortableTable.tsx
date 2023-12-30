import React, { useState } from "react";

interface SortableTableProps {
  data: any[];
  columns: string[];
}

const SortableTable: React.FC<SortableTableProps> = ({ data, columns }) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = sortColumn
    ? [...data].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) {
          return sortDirection === "asc" ? -1 : 1;
        }
        if (a[sortColumn] > b[sortColumn]) {
          return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      })
    : data;

  return (
    <table
      className="table table-striped mx-auto mt-5 w-75 
    "
    >
      <thead className="text-uppercase font-weight-bold border-bottom border-dark">
        <tr>
          {columns.map((column) => (
            <th
              key={column}
              onClick={() => handleSort(column)}
              className="col-2"
            >
              <div className="d-flex justify-content-between align-items-center">
                {column}
                {sortColumn === column && (
                  <span className="">
                    {sortDirection === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column}>{item[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortableTable;
