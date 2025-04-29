"use client";

import {
  Alert,
  Button,
  Checkbox,
  Divider,
  Flex,
  Form,
  Input,
  theme,
  Image
} from "antd";
import { observer } from "mobx-react";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import { IoPerson } from "react-icons/io5";
import AuthLayout from "../../../../components/AuthLayout";
import { PageName } from "@/types/page-name.enum";
import authViewModel from "../../../../providers/oauth/auth.viewmodel";
// import { OpenidVerifyQuery } from "../../../../repositories/types/openid/openid-verify-query.type";
import { Params } from "@/types/params.type";
import { Path } from "@/types/path.enum";
import loginViewModel from "./login.viewmodel";
import { Login } from "./types";
import themeViewModel from "@/providers/theme/them.viewmodel";

interface Props extends Params {}

enum Formfield {
  Username = "username",
  Password = "password",
  Remember = "remember",
}

const LoginPage: NextPage<Props> = ({ searchParams }) => {
  const router = useRouter();
  const { t } = useTranslation(PageName.Login);
  const [isReady, setIsReady] = useState(true);
  const { error, description, application } = loginViewModel;
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const submit = async (val: Login) => {
    const result = await loginViewModel.login(val, searchParams);
    if (!result) return;

    authViewModel.getAccessToken();

    router.push(result.redirect);
  };

  // const verify = async (val: OpenidVerifyQuery) => {
  //   const result = await loginViewModel.verify(val);
  //   if (result.error) {
  //     const params = new URLSearchParams({
  //       error: result.message,
  //       description: result.description,
  //     }).toString();
  //     const encodedURL = `${searchParams?.redirect_uri}?${params}`;
  //     return router.push(encodedURL);
  //   }
  //   setIsReady(!result.error);
  // };

  const verifyCode = (code: string) => {};

  const forgotPassword = () => {
    const params = new URLSearchParams({ ...searchParams }).toString();
    router.push(`${Path.ForgotPassword}?${params}`);
  };

  useEffect(() => {
    // if (searchParams?.response_type && searchParams?.redirect_uri) {
    //   verify(searchParams);
    // } else if (searchParams?.code) {
    //   verifyCode(searchParams.code);
    // } else if (searchParams?.error) {
    //   router.push(Path.Unauthorized);
    // } else {
    //   router.push(Path.Home);
    // }

    return () => {};

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  if (!isReady) return <></>;

  return (
    <AuthLayout
      submit={submit}
      icon={ <Image
        width={236}
        src={themeViewModel.isDarkMode?"/images/logo-dark.svg":"/images/logo-light.svg"  }
        preview={false}
      />}
    >
     
      {error && <Alert message={description} banner closable />}
      <div>
        <Form.Item
          label={t("username")}
          name={Formfield.Username}
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input style={{width: 380}} size="large" />
        </Form.Item>
        <Form.Item
          label={t("password")}
          name={Formfield.Password}
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input style={{width: 380}} size="large" type="password" />
        </Form.Item>
        <Form.Item>
          <Flex align="center" justify="flex-end">
            {/* <Form.Item
              name={Formfield.Remember}
              valuePropName="checked"
              noStyle
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

            <Button
              type="link"
              color="primary"
              style={{ padding: 0, color: colorPrimary }}
              onClick={forgotPassword}
            >
              {t("forgotPassword")}
            </Button>
          </Flex>
        </Form.Item>
        <Button
          block
          size="large"
          type="primary"
          htmlType="submit"
          loading={loginViewModel.isLoading}
        >
          {t("submit")}
        </Button>
        {/* <Divider plain>or</Divider> */}
        {/* <Button type="link" block color="primary" onClick={forgotPassword}>
          {t("forgotPassword")}
        </Button> */}
      </div>
    </AuthLayout>
  );
};

export default observer(LoginPage);
