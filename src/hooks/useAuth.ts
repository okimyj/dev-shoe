import useAuthAPI from "@/apis/auth";
import { UserDocumentData } from "@/apis/auth/types";
import { useEffect, useState } from "react";

// 나중에 다 이쪽으로 ...
const useAuth = () => {
  const { getCurrentUser } = useAuthAPI();
  const [userInfo, setUserInfo] = useState<UserDocumentData | null | undefined>(undefined);
  useEffect(() => {
    refreshUserInfo();
  }, []);
  const refreshUserInfo = async () => {
    const userInfo = await getCurrentUser();
    setUserInfo(userInfo);
  };
  // // const signin = (email: string, password: string) => {};
  // // const signup = (data: UserDocumentData) => {};
  return { userInfo };
};
export default useAuth;
