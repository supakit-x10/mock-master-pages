"use client";

import { Button, Divider, Flex, Typography, theme } from "antd";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { IoMail } from "react-icons/io5";
import AuthLayout from "../../../../components/AuthLayout";
import { Params } from "../../../../types/params.type";
import { Path } from "../../../../types/path.enum";

interface Props extends Params {}

const CheckYourEmailPage: NextPage<Props> = ({ searchParams }) => {
  const router = useRouter();

  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <AuthLayout>
      <Flex vertical justify="center" align="center">
        <Flex gap={16} vertical align="center">
          <IoMail size={90} color={colorPrimary} />
          <Typography.Title level={3}>Check Your Email</Typography.Title>
          <Typography.Text type="secondary" style={{ textAlign: "center" }}>
            We have sent a password recover instructions to your{" "}
            <Typography.Link color="primary">
              {searchParams?.email ?? ""}
            </Typography.Link>
          </Typography.Text>
        </Flex>
        <Divider plain>or</Divider>
        <Button
          type="link"
          block
          color="primary"
          onClick={() => {
            router.push(Path.Login);
          }}
        >
          Existing user? Sign in here
        </Button>
      </Flex>
    </AuthLayout>
  );
};

export default CheckYourEmailPage;
