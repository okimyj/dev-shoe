import { useForm } from "react-hook-form";
import { IFormData, schema } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthAPI from "@/apis/auth";
import { useNavigate } from "react-router-dom";
import { useAlertPopupStore } from "@/common/stores/useAlertPopupStore";
import { useLoginToLocation } from "@/common/stores/useLoginToLocation";

const useAuthSignup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const navigate = useNavigate();
  const { signUp } = useAuthAPI();
  const { path: loginToPath } = useLoginToLocation();
  const { open: openAlert } = useAlertPopupStore();
  const handleSignup = async (data: IFormData) => {
    const res = await signUp({ ...data, isSeller: data.isSeller ?? false });
    if (res.data) {
      navigate(loginToPath || "/");
    } else {
      if (res.error && res.error.code) {
        if (res.error.code === "auth/email-already-in-use")
          openAlert({ title: "Error!", contents: "이미 사용중인 이메일 입니다." });
        else
          openAlert({
            title: "Error!",
            contents: `code : ${res.error.code}\nmessage:${res.error.message}`,
          });
      }
    }
  };
  return { register, errors, handleSubmit, handleSignup };
};
export default useAuthSignup;
