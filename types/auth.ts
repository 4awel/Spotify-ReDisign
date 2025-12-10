export interface LoginCredType {
  email: string;
  password: string;
}

export interface LoginResponseType {
  token: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export interface AuthStateType {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
}
