"use client";

import { Table } from "antd";
import type { TableProps } from "antd";

interface Props<T> extends TableProps<T> {
  loading?: boolean;
}

const DataTable = <T extends object>({
  loading = false,
  ...props
}: Props<T>) => {
  return (
    <Table
      rowKey="key"
      loading={loading}
      pagination={{ pageSize: 10 }}
      scroll={{ x: "max-content" }}
      {...props}
    />
  );
};

export default DataTable;
