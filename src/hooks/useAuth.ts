import { UserData, UserDocumentData } from "@/apis/auth/types";
import { useState } from "react";

const useAuth = () => {
  const signin = (email: string, password: string) => {};
  const signup = (data: UserData) => {};
  return { signin, signup };
};
export default useAuth;
