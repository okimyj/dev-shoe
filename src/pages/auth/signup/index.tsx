import useAuthAPI from "@/apis/auth";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo/Logo";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import InnerBody from "../../layout/body/inner/InnerBody";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldData, IFormData, schema } from "./validation";
import ValidationField from "../../../components/form/ValidationField";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { signup } = useAuthAPI();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormData> = (data: IFormData) => {
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

  return (
    <InnerBody className="flex w-full items-center border">
      <Logo size="text-logo-l" />
      <form onSubmit={handleSubmit(onSubmit)}>
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
