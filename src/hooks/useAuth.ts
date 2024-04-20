import useAuthAPI from "@/apis/auth";
import { UserDocumentData } from "@/apis/auth/types";
import { useAuthStore } from "@/common/stores/useAuthStore";
import { useEffect, useState } from "react";

// 나중에 다 이쪽으로 ...
const useAuth = () => {
  const { userData } = useAuthStore();

  return { userData };
};
export default useAuth;
