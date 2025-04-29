"use client";

import { observer } from "mobx-react";
import { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Row, Col, Flex, Button } from "antd";
import BillingPage from "@/components/Billing/layout/BillingPage";
import SearchPanel from "@/components/Billing/common/SearchPanel";
import { DataTable } from "@/components/Billing/common/Table";
import parameterConfigViewModel from "./parameter-configuration.viewmode";

interface Props {}

const Page: NextPage<Props> = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  useEffect(() => {
    parameterConfigViewModel.setRouter(router);
  }, [router]);

  return (
    <BillingPage>
      <div>
        <SearchPanel
          title="Search"
          onSearch={() => parameterConfigViewModel.search()}
          onClear={() => parameterConfigViewModel.clear()}
        >
          <Form
            form={form}
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
          >
            <Row gutter={24}>
              <Col span={10}>
                <Form.Item name="paramKey" label="Parameter Key">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item name="paramCode" label="Parameter Code">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item name="paramValueTh" label="Parameter Value TH">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item name="paramValueEn" label="Parameter Value EN">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </SearchPanel>
        <Flex justify="flex-end" style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={() => parameterConfigViewModel.actionAddEdit()}
          >
            Create
          </Button>
        </Flex>
        <DataTable
          columns={parameterConfigViewModel.columns}
          dataSource={parameterConfigViewModel.dataSource}
          loading={parameterConfigViewModel.loading}
        />
      </div>
    </BillingPage>
  );
};

export default observer(Page);
