export interface User {
  discord_name: null | string;
  id: number;
  name: null | string;
  picture: null | string;
  twitter_id: null | string;
  wallet: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface AuthState {
  user: User;
  tokens: AuthTokens;
}

export interface AuthActions {
  login: (wallet: string) => Promise<void>;
}
