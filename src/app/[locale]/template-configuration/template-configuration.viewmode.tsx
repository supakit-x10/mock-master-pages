import { makeAutoObservable } from "mobx";
import { useRouter } from "next/navigation";
import { ColumnsType } from "antd/es/table";
import { TableActionButtons } from "@/components/Billing/common/Table";
import type { TemplateConfiguration } from "@/types/response/template-configuration.type";
import { TemplateConfigurationRepository } from "@/repositories/template-configuration.repository";
import { TemplateConfigurationRepositoryImpl } from "@/repositories/template-configuration.repository";
import type { ApiResponse } from "@/types/response/api-response.type";
import { message } from "antd";

class TemplateConfigurationViewModel {
  private repository: TemplateConfigurationRepository;
  dataSource: TemplateConfiguration[] = [];
  loading = false;

  constructor(repository: TemplateConfigurationRepository) {
    this.repository = repository;
    makeAutoObservable(this);
  }

  async createTemplate(data: any) {
    try {
      const response = await this.repository.createTemplateConfiguration(data);
      console.log("Create Response:", response);
    } catch (error) {
      console.error("Error creating template:", error);
    }
  }

  async selectTemplate(templateName: string): Promise<ApiResponse<TemplateConfiguration | null>> {
    return await this.repository.selectTemplateConfiguration(templateName);
  }


  private router: ReturnType<typeof useRouter> | null = null;

  setRouter(router: ReturnType<typeof useRouter>) {
    this.router = router;
  }

  get columns(): ColumnsType<TemplateConfiguration> {
    return [
      {
        title: "Template Name",
        dataIndex: "templateName",
        key: "templateName",
      },
      {
        title: "Source System",
        dataIndex: "sourceSystem",
        key: "sourceSystem",
      },
      {
        title: "File Type",
        dataIndex: "fileType",
        key: "fileType",
      },
      {
        title: "Skip Header",
        dataIndex: "skipHeader",
        key: "skipHeader",
      },
      {
        title: "Skip Footer",
        dataIndex: "skipFooter",
        key: "skipFooter",
      },
      {
        title: "Updated By",
        dataIndex: "updatedBy",
        key: "updatedBy",
      },
      {
        title: "Updated Date",
        dataIndex: "updatedDate",
        key: "updatedDate",
      },
      {
        title: "Action",
        key: "action",
        render: (_: any, record: TemplateConfiguration) => (
          <TableActionButtons
            // onEdit={() => this.actionAddEdit("edit", { string: record.templateName })}
            onDelete={() => this.onDelete(record)}
            onView={() => this.onView("view",{ string: record.templateName })}
          />
        ),
      },
    ];
  }

  search(filters: { templateName?: string }) {
    this.loading = true;
    this.repository
    .getTemplateConfigurations(filters)
      .then((response) => {
        console.log("Response:", response);
        if (response.code === 200 && response.data) {
          this.dataSource = response.data.map((item: any) => ({
            ...item,
            updatedDate: new Date(item.updatedDate).toLocaleString(),
            createdDate: new Date(item.createdDate).toLocaleString(),
          }));
        } else {
          console.error("Failed to fetch data");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        this.loading = false;
      });
  }


  clear() {
    this.dataSource = [];
  }

  actionAddEdit(action: "add" | "edit" = "add", data: { string?: string } = {}) {
    const path = `/template-configuration/${action}${data.string ? `/${data.string}` : ""}`;
    this.router?.push(path);
  }

  onDelete(record: TemplateConfiguration) {
    console.log("Delete", record);
    this.loading = true; // ตั้งค่า loading เป็น true ระหว่างการลบ
    this.repository
      .deleteTemplateConfiguration(record.templateName)
      .then((response) => {
        if (response.code === 200) {
          console.log("Delete successful:", response);
          message.success("ลบข้อมูลสำเร็จ!"); // แสดงข้อความสำเร็จ
          this.search({});
        } else {
          console.error("Failed to delete:", response.message);
          message.error("ไม่สามารถลบข้อมูลได้!"); // แสดงข้อความเมื่อเกิดข้อผิดพลาด
        }
      })
      .catch((error) => {
        console.error("Error deleting template:", error);
      })
      .finally(() => {
        this.loading = false; // ตั้งค่า loading เป็น false หลังจากเสร็จสิ้น
      });
  }

  onView(action: "view", data: { string?: string } = {}) {
    const path = `/template-configuration/${action}${data.string ? `/${data.string}` : ""}`;
    this.router?.push(path);
  }
}

const templateConfigurationViewModel = new TemplateConfigurationViewModel(
  new TemplateConfigurationRepositoryImpl() // ส่ง repository เข้าไปใน Constructor
);
export default templateConfigurationViewModel;