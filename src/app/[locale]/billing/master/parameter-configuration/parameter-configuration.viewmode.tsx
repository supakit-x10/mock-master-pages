import { makeAutoObservable } from "mobx";
import { useRouter } from "next/navigation";
import { ColumnsType } from "antd/es/table";
import { TableActionButtons } from "@/components/Billing/common/Table";
import type { ParameterConfig } from "@/types/response/billing/master/parameter-configuration.type";

class ParameterConfigurationViewModel {
  dataSource: ParameterConfig[] = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  private router: ReturnType<typeof useRouter> | null = null;

  setRouter(router: ReturnType<typeof useRouter>) {
    this.router = router;
  }

  get columns(): ColumnsType<ParameterConfig> {
    return [
      {
        title: "No.",
        dataIndex: "index",
        key: "index",
        width: 60,
        render: (_, __, index) => index + 1,
      },
      {
        title: "Parameter Key",
        dataIndex: "parameterKey",
        key: "parameterKey",
      },
      {
        title: "Parameter Code",
        dataIndex: "parameterCode",
        key: "parameterCode",
      },
      {
        title: "Parameter Value TH",
        dataIndex: "parameterValueTh",
        key: "parameterValueTh",
      },
      {
        title: "Parameter Value EN",
        dataIndex: "parameterValueEn",
        key: "parameterValueEn",
      },
      {
        title: "Action",
        key: "action",
        render: (_: any, record: ParameterConfig) => (
          <TableActionButtons
            onEdit={() => this.actionAddEdit("edit", { uuid: record.uuid })}
            onDelete={() => this.onDelete(record)}
            onView={() => this.onView(record)}
          />
        ),
      },
    ];
  }

  search() {
    this.loading = true;
    try {
      // mock
      this.dataSource = [
        {
          uuid: "1",
          parameterKey: "VAT_RATE",
          parameterCode: "3",
          parameterValueTh: "3%",
          parameterValueEn: "3%",
        },
        {
          uuid: "2",
          parameterKey: "VAT_RATE",
          parameterCode: "7",
          parameterValueTh: "7%",
          parameterValueEn: "7%",
        },
      ];
    } finally {
      this.loading = false;
    }
  }

  clear() {
    this.dataSource = [];
  }

  actionAddEdit(action: "add" | "edit" = "add", data: { uuid?: string } = {}) {
    const path = `/billing/master/parameter-configuration/${action}${data.uuid ? `/${data.uuid}` : ""}`;
    this.router?.push(path);
  }

  onDelete(record: ParameterConfig) {
    console.log("Delete", record);
  }

  onView(record: ParameterConfig) {
    console.log("View", record);
  }
}

const parameterConfigViewModel = new ParameterConfigurationViewModel();
export default parameterConfigViewModel;
