import { NextPage } from "next";
import AuthProvider from "../../../../providers/oauth/auth.provider";

interface Props {
  children: React.ReactNode;
}

const Layout: NextPage<Props> = ({ children }) => {
  return <AuthProvider isLogout={false}>{children}</AuthProvider>;
};

export default Layout;
