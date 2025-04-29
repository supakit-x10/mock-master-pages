"use client";

import { Button, Divider, Form, Input, theme } from "antd";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMail } from "react-icons/io5";
import AuthLayout from "../../../../components/AuthLayout";
import { PageName } from "../../../../i18n/types";
import { OpenidVerifyQuery } from "../../../../repositories/types/openid/openid-verify-query.type";
import { Params } from "../../../../types/params.type";
import { Path } from "../../../../types/path.enum";
import loginViewModel from "../login/login.viewmodel";

interface Props extends Params {}

interface FormForgotPassword {
  email: string;
}

const ForgotPasswordPage: NextPage<Props> = ({ searchParams }) => {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const { t } = useTranslation(PageName.ForgotPassword);
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const { application } = loginViewModel;

  const submit = (val: FormForgotPassword) => {
    const params = new URLSearchParams({ email: val.email }).toString();
    router.push(`${Path.CheckYourEmail}?${params}`);
  };

  const signInHere = () => {
    const params = new URLSearchParams({ ...searchParams }).toString();
    router.push(`${Path.Login}?${params}`);
  };

  const verify = async (val: OpenidVerifyQuery) => {
    const result = await loginViewModel.verify(val);
    if (result.error) {
      return router.push(Path.Unauthorized);
    }
    setIsReady(!result.error);
  };

  useEffect(() => {
    if (searchParams?.response_type && searchParams?.redirect_uri) {
      verify(searchParams);
    } else {
      router.push(Path.Home);
    }

    return () => {};

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isReady) return <></>;

  return (
    <AuthLayout
      icon={<IoMail size={18} color={colorPrimary} />}
      title={application.name || t("title")}
      subTitle={t("page")}
      description={t("description")}
      submit={submit}
      requiredMark={false}
    >
      <div>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Button size="large" type="primary" htmlType="submit" block>
          Continue
        </Button>
        <Divider plain>or</Divider>
        <Button type="link" block color="primary" onClick={signInHere}>
          Existing user? Sign in here
        </Button>
      </div>
    </AuthLayout>
  );
};
export default ForgotPasswordPage;
