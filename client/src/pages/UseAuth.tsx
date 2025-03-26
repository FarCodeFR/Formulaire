import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export default function useAuth() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext n'utilise pas AuthProvider");
  }
  return authContext;
}
