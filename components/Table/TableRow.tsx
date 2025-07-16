import React from "react";

const TableRow: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">{children}</tr>
  );
};

export default TableRow;
