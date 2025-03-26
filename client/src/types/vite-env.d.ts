/// <reference types="vite/client" />
// This provides types for the Vite-injected env variables on import.meta.env
// See https://vite.dev/guide/features.html#client-types

export type User = { email: string; pseudo: string; password: string };

export type loginData = { email: string; password: string };

export type UserName = { pseudo: string };

export interface AuthContextType {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  checkLogin: () => Promise<void>;
}

export interface OutletContext {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
