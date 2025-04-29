"use client";

import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Flex, Modal, Typography, theme } from "antd";
import { observer } from "mobx-react";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useMobxEffect } from "../../hook/useMobxEffect";
import { Path } from "../../types/path.enum";
import viewModel from "./auth.viewmodel";

interface Props {
  verify?: boolean;
  isLogout: boolean;
  children: ReactNode;
}

const AuthProvider: NextPage<Props> = ({
  verify,
  isLogout = true,
  children,
}) => {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  viewModel.getAccessToken();

  const checkVerify = async () => {
    const isVerify = await viewModel.verify();
    if (!isVerify) {
      return router.push(Path.Home);
    }
    setIsReady(isVerify);
  };

  useEffect(() => {
    const token = viewModel.getToken();
    if (!token) {
      return router.push(Path.Home);
    }

    if (verify) {
      checkVerify();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (verify && !isReady) return <></>;

  return <SessionLogin isLogout={isLogout}>{children}</SessionLogin>;
};

const SessionLogin: NextPage<Props> = ({ isLogout, children }) => {
  const router = useRouter();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const {
    token: { colorWarning },
  } = theme.useToken();
  const [open, setOpen] = useState(false);

  const onClick = async () => {
    if (isLogout) {
      await viewModel.logout();
    } else {
      viewModel.resetCookies();
      viewModel.reset();
    }
    setOpen(false);
    return router.push(Path.Home);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      viewModel.checkTokenExpired();
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMobxEffect(() => {
    if (viewModel.expired) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setOpen(true);
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewModel.expired]);

  return (
    <>
      {children}
      <Modal
        open={open}
        closeIcon={false}
        footer={
          <Button onClick={onClick} type="primary">
            Ok
          </Button>
        }
      >
        <Flex gap={16} align="start">
          <Flex>
            <Typography.Title level={5}>
              <InfoCircleOutlined style={{ color: colorWarning }} />
            </Typography.Title>
          </Flex>
          <Flex gap={8} vertical>
            <Typography.Title level={5}>
              Your session has expired.
            </Typography.Title>
            <Typography.Text type="secondary">
              Sign in again to continue working on awesome things!
            </Typography.Text>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};

export default observer(AuthProvider);
