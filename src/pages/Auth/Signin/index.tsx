import Logo from "@/components/logo/Logo";
import { Button } from "@/components/ui/button";
import InnerBody from "../../layout/body/inner/InnerBody";
import InputField from "@/components/form/InputField";
import useAuthSignin from "./hooks";
// import useAuthAPI from "@/apis/auth";
// import { Input } from "@/components/ui/input";
// import { useNavigate } from "react-router-dom";
// import { SubmitHandler, useForm } from "react-hook-form";

const SigninPage = () => {
  const { register, handleSubmit, handleSignin } = useAuthSignin();
  return (
    <InnerBody className="flex w-full items-center border">
      <Logo size="text-logo-l" />
      <form onSubmit={handleSubmit(handleSignin)}>
        <div className="m-10pxr flex-col space-y-10pxr">
          <InputField
            title="E-mail"
            placeHolder="Enter Email..."
            inputType="text"
            register={register("email")}
          />
          <InputField
            title="Password"
            placeHolder="Enter Password..."
            inputType="password"
            register={register("password")}
          />

          <Button type="submit" className="w-200pxr font-logo">
            Login To Email
          </Button>
        </div>
      </form>

      {/* <Input className="w-48" /> */}
    </InnerBody>
  );
};
export default SigninPage;
