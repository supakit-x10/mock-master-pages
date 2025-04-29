"use client";

import {
  ApartmentOutlined,
  AppstoreOutlined,
  ControlOutlined,
  DatabaseOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  SunOutlined,
  UngroupOutlined,
  UserOutlined,
  DashboardOutlined,
  ToolOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Breadcrumb,
  Button,
  Dropdown,
  Flex,
  Image,
  Layout,
  List,
  Menu,
  MenuProps,
  Typography,
  theme,
} from "antd";
import { observer } from "mobx-react";
import { NextPage } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ContentHeader from "@/components/ContentHeader";
import { Locale } from "@/types/locale.enum";
import AuthProvider from "@/providers/oauth/auth.provider";
import authViewModel from "@/providers/oauth/auth.viewmodel";
import themeViewModel from "@/providers/theme/them.viewmodel";
import { BreadcrumbTitle } from "@/types/breadcrumb.enum";
import { Params } from "@/types/params.type";
import { Path } from "@/types/path.enum";
import { getLangPath } from "@/utils/lang-path.util";
import { getPathname } from "@/utils/pathname.util";
import viewModel from "./app-layout.viewmodel";

interface Props extends Params {
  children: React.ReactNode;
}

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  menuCode?: string,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    menuCode,
  } as MenuItem;
}

type StaticMenuConfig = {
  module: "billing" | "job" | "crm";
  item: MenuItem;
};

const staticMenuList: StaticMenuConfig[] = [
  {
    module: "job",
    item: getItem(
      BreadcrumbTitle.Datasource,
      Path.Datasource,
      <DatabaseOutlined />
    ),
  },
  {
    module: "job",
    item: getItem(
      BreadcrumbTitle.Application,
      Path.Application,
      <AppstoreOutlined />
    ),
  },
  {
    module: "job",
    item: getItem(BreadcrumbTitle.Users, Path.Users, <UserOutlined />),
  },
  {
    module: "job",
    item: getItem(BreadcrumbTitle.Roles, Path.Roles, <ControlOutlined />),
  },
  {
    module: "job",
    item: getItem(BreadcrumbTitle.Groups, Path.Groups, <UngroupOutlined />),
  },
  {
    module: "job",
    item: getItem(BreadcrumbTitle.Actions, Path.Actions, <ApartmentOutlined />),
  },
  {
    module: "job",
    item: getItem(BreadcrumbTitle.Mail, Path.Email, <MailOutlined />),
  },
  {
    // กลุ่ม Master
    module: "billing",
    item: getItem(
      BreadcrumbTitle.Master,
      "billing-master",
      <DashboardOutlined />,
      "3101000",
      [
        getItem(
          BreadcrumbTitle.TemplateConfiguration,
          Path.TemplateConfiguration,
          undefined,
          "SCN-3101010"
        ),
        getItem(
          BreadcrumbTitle.ReconcileConfiguration,
          Path.ReconcileConfiguration,
          undefined,
          "SCN-3101020"
        ),
        getItem(
          BreadcrumbTitle.ProcessTemplate,
          Path.ProcessTemplate,
          undefined,
          "SCN-3101030"
        ),
        getItem(
          BreadcrumbTitle.ProcessReconcile,
          Path.ProcessReconcile,
          undefined,
          "SCN-3101040"
        ),
      ]
    ),
  },
];

// const items: MenuItem[] = [
//   getItem(BreadcrumbTitle.Datasource, Path.Datasource, <DatabaseOutlined />),
//   getItem(BreadcrumbTitle.Application, Path.Application, <AppstoreOutlined />),
//   getItem(BreadcrumbTitle.Users, Path.Users, <UserOutlined />),
//   getItem(BreadcrumbTitle.Roles, Path.Roles, <ControlOutlined />),
//   getItem(BreadcrumbTitle.Groups, Path.Groups, <UngroupOutlined />),
//   getItem(BreadcrumbTitle.Actions, Path.Actions, <ApartmentOutlined />),
//   getItem(BreadcrumbTitle.Mail, Path.Email, <MailOutlined />),
//   getItem(
//     BreadcrumbTitle.Master,
//     "Master",
//     <DashboardOutlined />,
//     [
//       getItem(BreadcrumbTitle.ParameterConfig, Path.ParameterConfig),
//       getItem(BreadcrumbTitle.HolidaysCalendar, Path.HolidaysCalendar),
//       getItem(BreadcrumbTitle.BillingSchedule, Path.BillingSchedule),
//       getItem(BreadcrumbTitle.GroupBill, Path.GroupBill),
//     ]
//   ),
//   // getItem(BreadcrumbTitle.Settings, Path.Settings, <SettingOutlined />, []),
// ];

const AppLayout: NextPage<Props> = ({ children, params: { locale } }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const {
    token: {
      colorBgContainer,
      colorPrimary,
      colorBorder,
      colorText,
      colorPrimaryBg,
      colorBgBase,
    },
  } = theme.useToken();
  const { collapsed, breadcrumbs, selectedKeys, title } = viewModel;
  const { isDarkMode } = themeViewModel;

  const setCollapsed = (val: boolean) => {
    viewModel.collapsed = val;
  };

  const setLang = (val: Locale) => {
    const path = getLangPath(val, pathname, searchParams.toString());
    router.replace(`${path}?${searchParams.toString()}`);
  };

  const onClick: MenuProps["onClick"] = (e) => {
    router.push(e.key);
    viewModel.selectedKeys = e.key as Path;
  };

  const logout = async () => {
    await authViewModel.logout();
    router.push(Path.Home);
  };

  const onPathname = () => {
    const path = getPathname(pathname);
    const menu = menuItems.map((item) => item?.key as Path);
    viewModel.setActive(path, menu);
    viewModel.setBreadcrumbsFromPath(path);
  };

  useEffect(() => {
    viewModel.lang = locale;
    //debugger;
    const module = "billing";
    const filtered = staticMenuList
      .filter((m) => m.module === module)
      .map((m) => m.item);
    setMenuItems(filtered);
    onPathname();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AuthProvider verify isLogout>
      <Layout>
        <Layout.Sider
          theme="light"
          width={256}
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            borderRight: `1px solid ${colorBorder}`,
          }}
          className="layout_sider"
        >
          <div>
            <Flex
              gap={8}
              justify={collapsed ? "center" : "left"}
              align="center"
              style={{ padding: "14px 29px" }}
            >
              <Image
                // alt="ums-logo"
                preview={false}
                width={90}
                src={
                  themeViewModel.isDarkMode
                    ? "/images/small-logo-dark.svg"
                    : "/images/small-logo-light.svg"
                }
              />
            </Flex>
          </div>
          <Menu
            theme="light"
            selectedKeys={[selectedKeys]}
            mode="inline"
            style={{ border: "none" }}
            items={menuItems}
            onClick={onClick}
          />
        </Layout.Sider>
        <Layout
          style={{
            // height: "100vh",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Layout.Header
            style={{
              padding: 0,
              background: colorBgContainer,
              position: "sticky",
              top: 0,
              zIndex: 100,
              borderBottom: `1px solid ${colorBorder}`,
            }}
          >
            <Flex gap={16} style={{ paddingRight: 16 }} align="center">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
              {/* <Input
                size="middle"
                placeholder="Search for Users"
                prefix={<SearchOutlined />}
                style={{ width: "100%", maxWidth: 520 }}
              /> */}
              <Flex flex={1} justify="end" align="center" gap={16}>
                <List style={{ height: "100%" }}>
                  <List.Item
                    actions={[
                      // <Dropdown
                      //   key="dropdown"
                      //   trigger={["click"]}
                      //   menu={{
                      //     items: [
                      //       {
                      //         key: "0",
                      //         label: (
                      //           <Button
                      //             type="link"
                      //             style={{ color: colorText }}
                      //             onClick={() => setLang(Locale.Th)}
                      //           >
                      //             Thai
                      //           </Button>
                      //         ),
                      //       },
                      //       {
                      //         key: "1",
                      //         label: (
                      //           <Button
                      //             type="link"
                      //             style={{ color: colorText }}
                      //             onClick={() => setLang(Locale.En)}
                      //           >
                      //             English
                      //           </Button>
                      //         ),
                      //       },
                      //     ],
                      //   }}
                      // >
                      //   <Button type="text" icon={<GlobalOutlined />}>
                      //     {viewModel.lang}
                      //   </Button>
                      // </Dropdown>,
                      <Button
                        key="mode"
                        type="text"
                        shape="circle"
                        onClick={() => {
                          themeViewModel.setDarkMode(!isDarkMode);
                        }}
                        icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
                      />,
                    ]}
                  ></List.Item>
                </List>

                <div>
                  <Dropdown
                    key="dropdown"
                    trigger={["click"]}
                    menu={{
                      items: [
                        {
                          key: "0",
                          label: (
                            <Button
                              type="link"
                              style={{ color: colorText }}
                              onClick={logout}
                            >
                              Logout
                            </Button>
                          ),
                        },
                      ],
                    }}
                  >
                    <Avatar
                      size={40}
                      style={{
                        backgroundColor: colorPrimary,
                        color: colorPrimaryBg,
                        cursor: "pointer",
                      }}
                    >
                      {authViewModel.username[0].toUpperCase()}
                    </Avatar>
                    {/* <Avatar
                      style={{
                        backgroundColor: colorPrimary,
                        verticalAlign: "middle",
                        cursor: "pointer",
                      }}
                      size="large"
                    >
                      {authViewModel.username[0].toUpperCase()}
                    </Avatar> */}
                  </Dropdown>
                </div>
              </Flex>
            </Flex>
          </Layout.Header>
          <Layout.Content
            style={{
              display: "flex",
              flexDirection: "column",
              background: colorBgContainer,
            }}
          >
            <ContentHeader>
              <Breadcrumb items={breadcrumbs}></Breadcrumb>
              <Typography.Title level={2}>{title}</Typography.Title>
            </ContentHeader>
            {children}
          </Layout.Content>
          <Layout.Footer
            style={{ textAlign: "center", bottom: 0, width: "100%" }}
          >
            User Management System ©{new Date().getFullYear()} Created by
            Extend it resource
          </Layout.Footer>
        </Layout>
      </Layout>
    </AuthProvider>
  );
};

export default observer(AppLayout);
