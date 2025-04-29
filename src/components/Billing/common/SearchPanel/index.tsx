// components/SearchPanel.tsx
"use client";

import { Button, Collapse, Space } from "antd";
import { ReactNode, useState } from "react";

interface Props {
  title?: string;
  defaultCollapse?: boolean;
  hiddenSearchButton?: boolean;
  hiddenCancelButton?: boolean;
  onSearch?: () => void;
  onClear?: () => void;
  children?: ReactNode;
}

const SearchPanel = ({
  title = "Search",
  defaultCollapse = false,
  hiddenSearchButton = false,
  hiddenCancelButton = false,
  onSearch,
  onClear,
  children,
}: Props) => {
  const [activeKey, setActiveKey] = useState<string[]>(
    defaultCollapse ? [] : ["1"]
  );

  return (
    <Collapse
      items={[
        {
          key: "1",
          label: title,
          children: (
            <>
              {children}
              <div style={{ textAlign: "right", marginTop: 14 }}>
                <Space>
                  {!hiddenCancelButton && (
                    <Button onClick={onClear}>Clear</Button>
                  )}

                  {!hiddenSearchButton && (
                    <Button type="primary" onClick={onSearch}>
                      Search
                    </Button>
                  )}
                </Space>
              </div>
            </>
          ),
        },
      ]}
      activeKey={activeKey}
      onChange={(key) => setActiveKey(Array.isArray(key) ? key : [key])}
      style={{ marginBottom: 24 }}
    />
  );
};

export default SearchPanel;
