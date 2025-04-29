// components/TableActionButtons.tsx
"use client";

import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Space } from "antd";

interface Props {
  record?: any;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
}

const TableActionButtons: React.FC<Props> = ({ onEdit, onDelete, onView }) => {
  return (
    <Space size="middle">
      {onEdit && (
        <EditOutlined style={{ cursor: "pointer" }} onClick={onEdit} />
      )}
      {onDelete && (
        <DeleteOutlined
          style={{ color: "orangered", cursor: "pointer" }}
          onClick={onDelete}
        />
      )}
      {onView && (
        <EyeOutlined
          style={{ color: "#1890ff", cursor: "pointer" }}
          onClick={onView}
        />
      )}
    </Space>
  );
};

export default TableActionButtons;
