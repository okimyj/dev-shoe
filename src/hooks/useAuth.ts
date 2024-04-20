import { useAuthStore } from "@/common/stores/useAuthStore";

// 나중에 다 이쪽으로 ...
const useAuth = () => {
  const { userData } = useAuthStore();

  return { userData };
};
export default useAuth;
