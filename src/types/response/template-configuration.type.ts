export interface TemplateConfiguration {
  id: number;
  templateName: string;
  templateEncoding: string;
  sourceSystem: string;
  fileType: string;
  skipHeader: number;
  skipFooter: number;
  createdBy: string;
  createdDate: string; // เปลี่ยนเป็น string หากต้องการแปลง timestamp เป็นวันที่
  updatedBy: string;
  updatedDate: string; // เปลี่ยนเป็น string หากต้องการแปลง timestamp เป็นวันที่
}

export interface Column {
  seq: number;
  column_index: number;
  column_name: string;
  column_type?: string; // Optional
  column_format?: string; // Optional
}