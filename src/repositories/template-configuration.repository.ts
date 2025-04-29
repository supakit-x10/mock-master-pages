import axiosAdapter from "../adapters/axios.adapter";
import { ApiPath } from "../types/api-path.enum";
import { ApiResponse,createApiResponse } from "../types/response/api-response.type";
import { TemplateConfiguration } from "../types/response/template-configuration.type";

export interface TemplateConfigurationRepository {
  getTemplateConfigurations(filters?: { templateName?: string }): Promise<ApiResponse<TemplateConfiguration[]>>;
  createTemplateConfiguration(data: TemplateConfiguration): Promise<ApiResponse<any>>;
  selectTemplateConfiguration(templateName: string): Promise<ApiResponse<TemplateConfiguration | null>>;
  deleteTemplateConfiguration(templateName: string): Promise<ApiResponse<TemplateConfiguration | null>>;
}

export class TemplateConfigurationRepositoryImpl implements TemplateConfigurationRepository {
  async getTemplateConfigurations(filters?: { templateName?: string }): Promise<ApiResponse<TemplateConfiguration[]>> {
    try {
      const response = await axiosAdapter.get(ApiPath.TemplateConfiguration, {
        params: filters, // ส่ง filters เป็น query parameters
      });
      // ดึง response.data.data เพื่อหลีกเลี่ยงการซ้อน
      return createApiResponse(response.data.data, response.status, false, response.data.message);
    } catch (error: any) {
      return createApiResponse([], error.response?.status || 500, true, error.message);
    }
  }

  async selectTemplateConfiguration(templateName: string): Promise<ApiResponse<TemplateConfiguration | null>> {
    try {
      const response = await axiosAdapter.get(`${ApiPath.TemplateConfiguration}/${templateName}`);
      return createApiResponse(response.data.data, response.status, false, response.data.message);
    } catch (error: any) {
      return createApiResponse(null, error.response?.status || 500, true, error.message);
    }
  }

  async deleteTemplateConfiguration(templateName: string): Promise<ApiResponse<TemplateConfiguration | null>> {
    try {
      const response = await axiosAdapter.delete(`${ApiPath.TemplateConfiguration}/${templateName}`);
      return createApiResponse(response.data.data, response.status, false, response.data.message);
    } catch (error: any) {
      return createApiResponse(null, error.response?.status || 500, true, error.message);
    }
  }

  async createTemplateConfiguration(data: TemplateConfiguration): Promise<ApiResponse<any>> {
    try {
      const response = await axiosAdapter.post(ApiPath.TemplateConfiguration, data);
      return createApiResponse(response.data.data, response.status, false,response.data.message);
    } catch (error: any) {
      return createApiResponse(null, error.response?.status || 500, true, error.message);
    }
  }
  
}