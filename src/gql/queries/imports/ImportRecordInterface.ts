export interface ImportRecord {
  id: number;
  data: any;
  createdAt: string;
  status: "" | "Create" | "Delete";
}
