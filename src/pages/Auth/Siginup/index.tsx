import { Button } from "@/components/ui/button";
import Logo from "@/components/logo/Logo";
import InnerBody from "../../layout/body/inner/InnerBody";
import { FieldData } from "./validation";
import ValidationField from "../../../components/form/ValidationField";
import useAuthSignup from "./hooks";

const SignupPage = () => {
  const { register, errors, handleSubmit, handleSignup } = useAuthSignup();

  return (
    <InnerBody className="flex w-full items-center border">
      <Logo size="text-logo-l" />
      <form onSubmit={handleSubmit(handleSignup)}>
        <div className="m-10pxr flex-col space-y-10pxr">
          {FieldData.map((field) => (
            <ValidationField
              title={field.title}
              placeHolder={field.placeHolder}
              register={register(field.validationKey)}
              inputType={field.inputType}
              error={errors[field.validationKey]?.message ?? ""}
            />
          ))}

          <span>
            I'm Seller <input type="checkbox" {...register("isSeller")} />
          </span>
        </div>
        <Button type="submit" className="w-200pxr font-logo">
          Login To Email
        </Button>
      </form>

      {/* <Input className="w-48" /> */}
    </InnerBody>
  );
};
export default SignupPage;
