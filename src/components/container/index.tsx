"use client";

import { Col, Row, theme } from "antd";
import { NextPage } from "next";
import { CSSProperties } from "react";
import { Children } from "../../types/children.type";

interface Props extends Children {
  style?: CSSProperties;
  background?: string;
}

const Container: NextPage<Props> = ({ style = { padding: 24 }, children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Row
      style={{
        background: colorBgContainer,
        display: "flex",
        justifyContent: "center",
        flex: 1,
        ...style,
      }}
    >
      <Col xs={24} sm={22} md={20} lg={20} style={style}>
        {children}
      </Col>
    </Row>
  );
};

export default Container;
