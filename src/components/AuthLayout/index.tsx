import { Flex, Form, Typography } from "antd";
import { NextPage } from "next";
import styles from "./auth-layout.module.css";

interface Props {
  icon?: React.ReactNode;
  title?: string;
  subTitle?: string;
  children: React.ReactNode;
  requiredMark?: boolean;
  description?: string;
  submit?: (values: any) => void;
}

const AuthLayout: NextPage<Props> = ({
  submit,
  icon,
  title,
  subTitle = "",
  description = "",
  children,
  requiredMark = true,
}) => {
  return (
    <div className={styles.container}>
      <Form layout="vertical" requiredMark={requiredMark} onFinish={submit}>
        <Flex gap={24} vertical flex={1}>
          <div>
            <Flex gap={5} align="center" justify="center">
              {icon}
              <Typography.Text style={{ fontWeight: "bold" }}>
                {subTitle.toUpperCase()}
              </Typography.Text>
            </Flex>
          </div>
          <Flex gap={8} vertical>
            <Typography.Title level={3}>{title}</Typography.Title>
            <Typography.Text type="secondary">{description}</Typography.Text>
          </Flex>
          {children}
        </Flex>
      </Form>
    </div>
  );
};

export default AuthLayout;
