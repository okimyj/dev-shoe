import useAuthAPI from "@/apis/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/logo/Logo";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import InnerBody from "./layout/body/inner/InnerBody";
type Inputs = {
  email: string;
  password: string;
};
const SigninPage = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const { signin } = useAuthAPI();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    signin(data.email, data.password)
      .then((res) => {
        navigate("/");
      })
      .catch((res) => {
        if (res.error.code && res.error.code === "auth/invalid-email") {
          navigate("/signup");
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
        <Button type="submit" className="w-200pxr font-logo">
          Login To Email
        </Button>
      </form>

      {/* <Input className="w-48" /> */}
    </InnerBody>
  );
};
export default SigninPage;
