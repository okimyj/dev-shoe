import { IUserData, UserDocumentData } from "@/apis/auth/types";
import { useState } from "react";
// 나중에 다 이쪽으로 ...
const useAuth = () => {
  const signin = (email: string, password: string) => {};
  const signup = (data: IUserData) => {};
  const getCurrentUser = () => {};
  return { signin, signup };
};
export default useAuth;
