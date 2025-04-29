"use client";

import { Card, Col, Flex, Image, Row, Typography } from "antd";
import { observer } from "mobx-react";
import { useRouter } from "next/navigation";
import Container from "../../../components/container";
import { Path } from "../../../types/path.enum";
const MenuPage = () => {
  const router = useRouter();

  const arrMenu = [
    {
      id: 1,
      title: "Executive Dashboard",
      icon: "/images/executive_dashboard.png",
    },
    {
      id: 2,
      title: "CRM",
      icon: "/images/crm.png",
    },
    {
      id: 3,
      title: "Cost sheet",
      icon: "/images/cost_sheet.png",
    },
    {
      id: 4,
      title: "Job management",
      icon: "/images/job_management.png",
    },
    {
      id: 5,
      title: "Billing management",
      icon: "/images/billing_management.png",
    },
    {
      id: 6,
      title: "System Administrator",
      icon: "/images/system_administrator.png",
    },
  ];

  return (
    <Container>
      <Flex gap={24} vertical style={{ padding: 20 }}>
        <Typography.Title level={3}>Main menu</Typography.Title>
        <Row gutter={[60, 55]}>
          {arrMenu.map((menu) => (
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <Card
                key={menu.id}
                hoverable
                cover={
                  <Image
                    preview={false}
                    alt="menu-logo"
                    src={menu.icon}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                      borderRadius: 4,
                      overflow: "hidden",
                      cursor: "pointer",
                      maxHeight: "200px",
                    }}
                  />
                }
                styles={{
                  cover: {
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 12,
                  },
                  body: {
                    textAlign: "center",
                  },
                }}
                style={{ backgroundColor: "#F9F9FB" }}
                onClick={() => router.push(Path.Album)}
              >
                <Card.Meta title={menu.title} />
              </Card>
            </Col>
          ))}
        </Row>
      </Flex>
    </Container>
  );
};

export default observer(MenuPage);
