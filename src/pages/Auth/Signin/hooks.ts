import { useForm } from "react-hook-form";
import useAuthAPI from "@/apis/auth";
import { useNavigate } from "react-router-dom";
import { useAlertPopupStore } from "@/common/stores/useAlertPopupStore";
type Inputs = {
  email: string;
  password: string;
};
const useAuthSignin = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const { signin } = useAuthAPI();
  const navigate = useNavigate();
  const { open: openAlert } = useAlertPopupStore();
  const handleSignin = (data: Inputs) => {
    signin(data.email, data.password)
      .then((res) => {
        navigate("/");
      })
      .catch((res) => {
        if (res.error.code && res.error.code === "auth/invalid-email") {
          openAlert(
            "email이 존재하지 않습니다.",
            "회원가입 페이지로 이동합니다.",
            (confirm) => {
              if (confirm) navigate("/signup");
            },
            undefined,
            "확인",
          );
        }
      });
  };
  return { register, handleSubmit, handleSignin };
};
export default useAuthSignin;
