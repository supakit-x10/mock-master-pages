"use client";

import { theme } from "antd";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import { IoPersonAdd } from "react-icons/io5";
import AuthLayout from "../../../../components/AuthLayout";
import { PageName } from "@/types/page-name.enum";
// import { OpenidVerifyQuery } from "../../../../repositories/types/openid/openid-verify-query.type";
import { Params } from "../../../../types/params.type";
import { Path } from "@/types/path.enum";
// import registerViewModel from "./register.viewmodel";

interface Props extends Params {}

const RegisterPage: NextPage<Props> = ({ searchParams }) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const { t } = useTranslation(PageName.Login);
  // const { application } = registerViewModel;

  // const verify = async (val: OpenidVerifyQuery) => {
  //   const result = await registerViewModel.verify(val);
  //   if (!result) {
  //     router.push(Path.Unauthorized);
  //   }
  //   setIsReady(result);
  // };

  const verifyCode = (code: string) => {};

  const submit = () => {};

  useEffect(() => {
    // if (searchParams?.response_type && searchParams?.redirect_uri) {
    //   verify(searchParams);
    // } else if (searchParams?.code) {
    //   verifyCode(searchParams.code);
    // } else {
    //   router.push(Path.Home);
    // }

    return () => {};

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isReady) return <></>;

  return (
    <AuthLayout
      submit={submit}
      // icon={<IoPersonAdd size={18} color={colorPrimary} />}
      title={ t("title")}
      subTitle="Register"
      description={t("description")}
      requiredMark={false}
    >
      <div></div>
    </AuthLayout>
  );
};

export default RegisterPage;
