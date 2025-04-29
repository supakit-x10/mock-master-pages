import { FC, ReactNode } from "react";
import styles from "./billing-page.module.css";

interface Props {
  children: ReactNode;
}

const BillingPage: FC<Props> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default BillingPage;
