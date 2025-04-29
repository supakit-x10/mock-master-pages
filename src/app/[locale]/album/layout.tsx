import type { NextPage } from "next";
import AppLayout from "@/providers/layout/app-layout.provider";
import { Params } from "@/types/params.type";

interface Props extends Params {
  children: React.ReactNode;
}

const Layout: NextPage<Props> = async ({ children, params, searchParams }) => {
  return (
    <AppLayout params={params} searchParams={searchParams}>
      {children}
    </AppLayout>
  );
};

export default Layout;
