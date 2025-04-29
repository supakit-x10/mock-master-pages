"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Typography, Form, Input, Button, Select, Checkbox } from "antd";
import { Row, Col } from "antd";
import templateConfigurationViewModel from "@/app/[locale]/template-configuration/template-configuration.viewmode";
import { message } from "antd";

const TemplateConfigurationPage = () => {
  const [form] = Form.useForm();
  const [isDisabled, setIsCsv] = useState(false);
  const [isViewDisabled, setIsViewDisabled] = useState(false);
  const router = useRouter();
  const params = useParams();
  const parts = params.form || [];

  const isAdd = parts[0] === "add";
  const isView = parts[0] === "view" && !!parts[1];
  const isEdit = parts[0] === "edit" && !!parts[1];

  useEffect(() => {
    if (isEdit && parts[1] || isView && parts[1]) {
      selectTemplateConfiguration(parts[1]);
    }
    if (isView) {
      setIsViewDisabled(true);
    }
    if (form.getFieldValue("fileType")) {
      setIsCsv(form.getFieldValue("fileType") === "csv");
    }
  }, [isEdit, parts, form]);


  const onValuesChange = (changedValues: any) => {
    if (changedValues.fileType) {
      setIsCsv(changedValues.fileType === "csv");
    }
  };

  const selectTemplateConfiguration = async (templateName: string) => {
    try {
      const response = await templateConfigurationViewModel.selectTemplate(templateName);
      if (response.success) {
        form.setFieldsValue(response.data);
      } else {
        message.error("ไม่พบข้อมูลที่ต้องการแก้ไข");
      }
    } catch (error) {
      message.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
  };

  const onFinish = async (values: any) => {
    // แปลงข้อมูลจาก Form เป็น camelCase
    const formattedValues = {
      ...values,
      columns: values.columns.map((col: any) => ({
        ...col,
        columnType: col.columnType || undefined,
        columnFormat: col.columnFormat || undefined,
      })),
    };
    try {
      await templateConfigurationViewModel.createTemplate(formattedValues);
      message.success("บันทึกสำเร็จ!"); // แสดงข้อความเมื่อบันทึกสำเร็จ
      router.push('/template-configuration'); // เปลี่ยนหน้าไปยังหน้า List
    } catch (error) {
      message.error("เกิดข้อผิดพลาดในการบันทึก!"); // แสดงข้อความเมื่อเกิดข้อผิดพลาด
    }
  };

  return (
    <div style={{ marginLeft: "100px", marginRight: "100px" }}>
      <Typography.Title level={3}>
        {isAdd ? "Add Template" : isEdit ? "Edit Template" : "Template Form"}
      </Typography.Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        initialValues={{
          templateName: "",
          templateEncoding: "",
          sourceSystem: "",
          fileType: "csv",
          skipHeader: 0,
          skipFooter: 0,
          delimiter: ",",
          lineEnding: "\\n",
          containHeader: false,
          enclosure: false,
          columns: [],
        }}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Template Name"
              name="templateName"
              rules={[{ required: true, message: "Please input the template name!" }]}
            >
              <Input placeholder="Enter template name" disabled={isViewDisabled} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Template Encoding"
              name="templateEncoding"
              rules={[{ required: true, message: "Please input the template encoding!" }]}
            >
              <Input placeholder="Enter template encoding" disabled={isViewDisabled} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Source System"
              name="sourceSystem"
              rules={[{ required: true, message: "Please input the source system!" }]}
            >
              <Input placeholder="Enter source system" disabled={isViewDisabled} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="File Type" name="fileType">
              <Select disabled={isViewDisabled}>
                <Select.Option value="csv">CSV</Select.Option>
                <Select.Option value="txt">TXT</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Skip Header (Number)" name="skipHeader">
              <Input type="number" placeholder="Enter number of headers to skip" disabled={isViewDisabled} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Skip Footer (Number)" name="skipFooter">
              <Input type="number" placeholder="Enter number of footers to skip" disabled={isViewDisabled} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Delimiter" name="delimiter">
              <Input placeholder="Enter delimiter" disabled={isViewDisabled || isDisabled} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Line Ending" name="lineEnding">
              <Input placeholder="Enter line ending (e.g., \\n, \\r\\n)" disabled={isViewDisabled} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Contain Header" name="containHeader" valuePropName="checked">
              <Checkbox disabled={isViewDisabled}>Yes</Checkbox>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Enclosure" name="enclosure" valuePropName="checked">
              <Checkbox disabled={isViewDisabled}>Yes</Checkbox>
            </Form.Item>
          </Col>
        </Row>
        {/* Columns Array */}
        <Form.List name="columns">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey }) => (
                <div key={key} style={{ marginBottom: "16px", border: "1px solid #d9d9d9", padding: "16px" }}>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item
                        label="Sequence"
                        name={[name, "seq"]}
                        fieldKey={[fieldKey, "seq"]}
                        rules={[{ required: true, message: "Please input sequence!" }]}
                      >
                        <Input placeholder="Enter sequence" disabled={isViewDisabled} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Column Index"
                        name={[name, "columnIndex"]}
                        fieldKey={[fieldKey, "columnIndex"]}
                      >
                        <Input type="number" placeholder="Enter column index" disabled={isViewDisabled} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Column Name"
                        name={[name, "columnName"]}
                        fieldKey={[fieldKey, "columnName"]}
                      >
                        <Input placeholder="Enter column name" disabled={isViewDisabled} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item
                        label="Column Type"
                        name={[name, "columnType"]}
                        fieldKey={[fieldKey, "columnType"]}
                      >
                        <Input placeholder="Enter column type" disabled={isViewDisabled} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Column Format"
                        name={[name, "columnFormat"]}
                        fieldKey={[fieldKey, "columnFormat"]}
                      >
                        <Input placeholder="Enter column format" disabled={isViewDisabled} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Start Index (TXT)"
                        name={[name, "startIndex"]}
                        fieldKey={[fieldKey, "startIndex"]}
                      >
                        <Input type="number" placeholder="Enter start index" disabled={isViewDisabled || isDisabled} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item
                        label="End Index (TXT)"
                        name={[name, "endIndex"]}
                        fieldKey={[fieldKey, "endIndex"]}
                      >
                        <Input type="number" placeholder="Enter end index" disabled={isViewDisabled || isDisabled} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Expression"
                        name={[name, "expression"]}
                        fieldKey={[fieldKey, "expression"]}
                      >
                        <Input placeholder="Enter expression" disabled={isViewDisabled} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Button type="default" onClick={() => remove(name)} disabled={isViewDisabled}>
                    Remove Column
                  </Button>
                </div>
              ))}
              <Button type="dashed" onClick={() => add()} block disabled={isViewDisabled} style={{ marginBottom: "24px" }}>
                Add Column
              </Button>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Row justify="end" gutter={16}>
            <Col>
              <Button
                type="default"
                onClick={() => router.push('/template-configuration')}
              >
                Back
              </Button>
            </Col>
            {!isView && (
              <Col>
                <Button type="primary" htmlType="submit">
                  {isAdd ? "Create" : "Save"}
                </Button>
              </Col>
            )}
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TemplateConfigurationPage;