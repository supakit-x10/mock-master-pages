import React from "react";
import { Spin } from "antd";
import "./spinner.scss";

const Spinner = () => {
  return (
    <div className="global-spinner">
      <Spin className="global-spinner__icon" />
    </div>
  );
};

export default Spinner;
