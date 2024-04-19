import { useForm } from "react-hook-form";
import { IFormData, schema } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuthAPI from "@/apis/auth";
import { useNavigate } from "react-router-dom";

const useAuthSignup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const navigate = useNavigate();
  const { signup } = useAuthAPI();

  const handleSignup = (data: IFormData) => {
    signup({ ...data, isSeller: data.isSeller ?? false })
      .then((res) => {
        navigate("/");
      })
      .catch((res) => {
        if (res.error.code && res.error.code === "auth/invalid-email") {
        }
        console.log(res.error);
      });
  };
  return { register, errors, handleSubmit, handleSignup };
};
export default useAuthSignup;
