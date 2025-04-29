"use client";

import { observer } from "mobx-react";
import { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Row, Col, Flex, Button } from "antd";
import BillingPage from "@/components/Billing/layout/BillingPage";
import SearchPanel from "@/components/Billing/common/SearchPanel";
import { DataTable } from "@/components/Billing/common/Table";
import templateConfigurationViewModel from "./template-configuration.viewmode";
import { runInAction } from "mobx";

interface Props {}

const Page: NextPage<Props> = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  useEffect(() => {
    templateConfigurationViewModel.setRouter(router);
  }, [router]);

  return (
    <BillingPage>
      <div>
        <SearchPanel
          title="Search"
          onSearch={() => {
            const values = form.getFieldsValue();
            templateConfigurationViewModel.search(values);
          }}
          onClear={() => {
            form.resetFields(); // ล้างค่าฟอร์ม
            templateConfigurationViewModel.clear();
          }}
        >
          <Form
            form={form}
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
          >
            <Row gutter={24}>
              <Col span={10}>
                <Form.Item name="templateName" label="Template Name">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </SearchPanel>
        <Flex justify="flex-end" style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={() => templateConfigurationViewModel.actionAddEdit()}
          >
            Create
          </Button>
        </Flex>
        <DataTable
          columns={templateConfigurationViewModel.columns}
          dataSource={templateConfigurationViewModel.dataSource.slice()}
          loading={templateConfigurationViewModel.loading}
        />
      </div>
    </BillingPage>
  );
};

export default observer(Page);
