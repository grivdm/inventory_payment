import { on } from "events";
import React, { useState } from "react";

interface SortableTableProps {
  data: any[];
  columns: string[];
  onDelete: (pk: string) => void;
}

const SortableTable: React.FC<SortableTableProps> = ({
  data,
  columns,
  onDelete,
}) => {
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

  const del = (pk: string) => {
    if (window.confirm("Are you sure ?")) {
      onDelete(pk);
    }
  };

  return (
    <table
      className="table table-striped mx-auto mt-5 
    "
    >
      <thead className="text-uppercase font-weight-bold border-bottom border-dark">
        <tr>
          {/* {columns.map((column) => (
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
          ))} */}
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
          <th className="col-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column}>{item[column]}</td>
            ))}
            <td colSpan={columns.length + 1} className="text-right">
              <button
                className="btn btn-danger"
                onClick={() => del(item["pk"])}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortableTable;
