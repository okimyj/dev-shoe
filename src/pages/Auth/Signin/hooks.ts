import { useForm } from "react-hook-form";
import useAuthAPI from "@/apis/auth";
import { useNavigate } from "react-router-dom";
type Inputs = {
  email: string;
  password: string;
};
const useAuthSignin = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const { signin } = useAuthAPI();
  const navigate = useNavigate();

  const handleSignin = (data: Inputs) => {
    signin(data.email, data.password)
      .then((res) => {
        navigate("/");
      })
      .catch((res) => {
        if (res.error.code && res.error.code === "auth/invalid-email") {
          navigate("/signup");
        }
        console.log(res.error);
      });
  };
  return { register, handleSubmit, handleSignin };
};
export default useAuthSignin;
