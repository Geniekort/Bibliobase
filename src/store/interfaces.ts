export interface AuthenticationState {
  uid: string;
  accessToken: string;
  client: string;
  loggedIn: boolean;
}

export interface DataModelState {
  dataModelProjectId: string | null; // Store the id of the project of which the data model is loaded.
  dataTypes: Array<DataType>;
}

export interface DataType {
  id: string;
  name: string;
  dataAttributes: Array<DataAttribute>;
}

export interface DataAttribute {
  id: number;
  name: string;
  attributeType: "DateTime" | "Number" | "Reference" | "Text";
  validationDefinition: DataAttributeValidationDefinition;
}

export interface DataAttributeValidationDefinition {
  referredDataType: { condition: {id: number} };
}

export interface RootState {
  authentication: AuthenticationState;
  dataModel: DataModelState;
}

export interface CurationMapping {[k: string]: number}

export type VForm = Vue & { validate: () => boolean }
