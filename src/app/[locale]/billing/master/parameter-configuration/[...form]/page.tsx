"use client";

import { useParams } from "next/navigation";
import { Typography } from "antd";

const ParameterFormPage = () => {
  // const params = useParams();
  // console.log(params);
  const { IdOrAction, uuid } = useParams();

  const parts = Array.isArray(IdOrAction) ? IdOrAction : [IdOrAction];

  const isAdd = parts[0] === "add";
  const isEdit = parts[0] === "edit" && parts[1];

  return <div>{/* ต่อไป: render ฟอร์มเพิ่ม หรือโหลดข้อมูลมาแก้ */}</div>;
};

export default ParameterFormPage;
