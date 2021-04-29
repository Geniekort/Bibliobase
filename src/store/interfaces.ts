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
  id: number;
  name: string;
  dataAttributes: Array<DataAttribute>;
}

export interface DataAttribute {
  id: number;
  name: string;
  attributeType: "DateTime" | "Number" | "Reference" | "Text";
}

export interface RootState {
  authentication: AuthenticationState;
  dataModel: DataModelState;
}

export type VForm = Vue & { validate: () => boolean }
