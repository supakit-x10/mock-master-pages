"use client";

import { Button, Divider, Form, Input, theme } from "antd";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IoMail } from "react-icons/io5";
import AuthLayout from "../../../../components/AuthLayout";
import { PageName } from "../../../../i18n/types";
import { Path } from "../../../../types/path.enum";

interface Props {}

const Reset2FAPage: NextPage<Props> = ({}) => {
  const router = useRouter();
  const { t } = useTranslation(PageName.ResetTwoFactor);
  const {
    token: { colorPrimary },
  } = theme.useToken();

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <AuthLayout
      icon={<IoMail size={18} color={colorPrimary} />}
      title={"Ums"}
      subTitle={t("title")}
      description={t("description")}
    >
      <div>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: false, message: "Please input your Username!" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Button size="large" type="primary" htmlType="submit" block>
          {t("btnSubmit")}
        </Button>
        <Divider plain>or</Divider>
        <Button
          type="link"
          block
          color="primary"
          onClick={() => {
            router.push(Path.Login);
          }}
        >
          {t("btnSignIn")}
        </Button>
      </div>
    </AuthLayout>
  );
};

export default Reset2FAPage;
