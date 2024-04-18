import useAuthAPI from "@/apis/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/logo/Logo";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import InnerBody from "./layout/body/inner/InnerBody";
import { Checkbox } from "@/components/ui/checkbox";
type Inputs = {
  email: string;
  nickname: string;
  isSeller: boolean;
  password: string;
  passwordConfirm: string;
};
const SignupPage = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const { signup } = useAuthAPI();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    signup(data.email, data.password)
      .then((res) => {
        navigate("/");
      })
      .catch((res) => {
        if (res.error.code && res.error.code === "auth/invalid-email") {
        }
        console.log("res.error.code : ", res.error.code);
        console.log(res.error);
      });
  };

  return (
    <InnerBody className="flex w-full items-center border">
      <Logo size="l" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input className="mb-10pxr w-200pxr" placeholder="Enter Email" {...register("email")} />

        <Input
          className="mb-10pxr w-200pxr"
          placeholder="Enter Password"
          type="password"
          {...register("password")}
        />
        <Input
          className="mb-10pxr w-200pxr"
          placeholder="Enter Password"
          type="password"
          {...register("passwordConfirm")}
        />
        <Input
          className="mb-10pxr w-200pxr"
          placeholder="Enter Nickname"
          {...register("nickname")}
        />

        <label>
          <Checkbox {...register("isSeller")} /> isSeller
        </label>

        <Button type="submit" className="w-200pxr font-logo">
          Login To Email
        </Button>
      </form>

      {/* <Input className="w-48" /> */}
    </InnerBody>
  );
};
export default SignupPage;
