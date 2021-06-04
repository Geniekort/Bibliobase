export interface ImportRecord {
  curationActions: Array<CurationAction>;
  id: number;
  data: any;
  createdAt: string;
  status: "" | "Create" | "Delete";
}

export interface CurationAction { 
  id: number;
  importRecord: ImportRecord;
  createdDataObject: DataObject;
}

export interface DataObject {
  id: number;
  data: {[k: string]: any};
}

export interface ImportQueryResult {
  parsed: boolean;
  id: number;
  name: string;
  createdAt: string;
}

export interface CurationSessionQueryResult {
  id: number;  
  createdAt: string;
  import?: ImportQueryResult;
  curatableRecords: Array<ImportRecord>;
}

export enum QueryFilterMatcher {
  EXACTLY = "exactly",
  AT_LEAST = "atLeast",
  AT_MOST = "atMost",
  CONTAINS = "contains"
}
