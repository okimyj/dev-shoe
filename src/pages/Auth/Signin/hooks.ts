import { useForm } from "react-hook-form";
import useAuthAPI from "@/apis/auth";
import { useNavigate } from "react-router-dom";
import { useAlertPopupStore } from "@/common/stores/useAlertPopupStore";
import { useLoginToLocation } from "@/common/stores/useLoginToLocation";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
type Inputs = {
  email: string;
  password: string;
};
const useAuthSignin = () => {
  const { userData } = useAuth();
  const { register, handleSubmit } = useForm<Inputs>();
  const { signIn } = useAuthAPI();
  const navigate = useNavigate();
  const { path: loginToPath } = useLoginToLocation();
  const { open: openAlert } = useAlertPopupStore();
  useEffect(() => {
    if (userData) navigate(loginToPath || "/");
  }, [userData]);
  const handleSignin = async (data: Inputs) => {
    const res = await signIn(data.email, data.password);
    if (res.data) {
      navigate(loginToPath || "/");
    } else {
      if (res.error && res.error.code) {
        if (res.error && res.error.code) {
          if (res.error.code === "auth/invalid-email")
            openAlert({
              title: "Error!",
              contents: "이메일이 존재하지 않습니다.\n회원가입 페이지로 이동합니다.",
              hasCancel: true,
              onClose: (confirm) => {
                if (confirm) navigate("/signup");
              },
            });
          else if (res.error.code === "auth/invalid-credential") {
            openAlert({ title: "로그인 실패", contents: "아이디와 비밀번호가 일치하지 않습니다." });
          } else {
            openAlert({
              title: "Error!",
              contents: `code : ${res.error.code}\nmessage:${res.error.message}`,
            });
          }
        }
      }
    }
  };
  return { register, handleSubmit, handleSignin };
};
export default useAuthSignin;
