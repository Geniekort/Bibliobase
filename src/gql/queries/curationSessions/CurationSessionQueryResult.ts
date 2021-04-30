import { ImportQueryResult } from "../imports/ImportQueryResult";

export interface CurationSessionQueryResult {
  id: number;  
  createdAt: string;
  import?: ImportQueryResult;
}
