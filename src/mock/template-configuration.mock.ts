import { ApiPath } from "@/types/api-path.enum";
import MockAdapter from "axios-mock-adapter";

export const templateConfigurationMocks = (mock: MockAdapter) => {
  // Mock POST /template-configuration
  mock.onPost(ApiPath.TemplateConfiguration).reply(200, {
    message: "Template configuration created successfully",
    status: "success",
  });

  // Mock GET /template-configuration
  mock.onGet(ApiPath.TemplateConfiguration).reply(200, [
    {
      id: 7,
      templateName: "ktb001",
      templateEncoding: "UTF-8",
      sourceSystem: "ktb",
      fileType: "csv",
      skipHeader: 5,
      skipFooter: 3,
      createdBy: "system",
      createdDate: 1745544429252,
      updatedBy: "system",
      updatedDate: 1745544429252,
    },
    {
      id: 8,
      templateName: "scb001",
      templateEncoding: "TIS-620",
      sourceSystem: "scb",
      fileType: "csv",
      skipHeader: 3,
      skipFooter: 0,
      createdBy: "system",
      createdDate: 1745544435390,
      updatedBy: "system",
      updatedDate: 1745544435390,
    },
    {
      id: 9,
      templateName: "scb002",
      templateEncoding: "UTF-8",
      sourceSystem: "scb",
      fileType: "txt",
      skipHeader: 1,
      skipFooter: 1,
      createdBy: "system",
      createdDate: 1745544605841,
      updatedBy: "system",
      updatedDate: 1745544605841,
    },
  ]);
};