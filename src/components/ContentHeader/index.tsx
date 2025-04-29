import { NextPage } from "next";
import styles from "./content-header.module.css";

interface Props {
  children: React.ReactNode;
}

const ContentHeader: NextPage<Props> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default ContentHeader;
