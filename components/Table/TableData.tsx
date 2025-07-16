import React from "react";

interface TableDataProps {
  children: React.ReactNode;
}

const TableData = ({ children }: TableDataProps) => {
  return <td className="py-3 px-6 text-left">{children}</td>;
};

export default TableData;
