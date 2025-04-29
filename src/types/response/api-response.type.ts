export interface ApiResponse<T = any> {
  data: T | null; // เพิ่ม null เพื่อรองรับกรณีที่ไม่มีข้อมูล
  code: number;
  readonly success: boolean;
  error: boolean;
  message?: string;
  description?: string;
}

export function createApiResponse<T>(data: T, code: number, error: boolean, message?: string, description?: string): ApiResponse<T> {
  return {
    data, // ใช้ data ตรง ๆ โดยไม่ซ้อน
    code,
    success: code === 200,
    error,
    message,
    description,
  };
}