export interface AuthenticationState {
  uid: string;
  accessToken: string;
  client: string;
  loggedIn: boolean;
}

export interface RootState {
  authentication: AuthenticationState;
}