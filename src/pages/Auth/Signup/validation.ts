import * as yup from "yup";
import * as zod from "zod";
export interface IFormData {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
  isSeller?: boolean;
}

export const schema = zod
  .object({
    email: zod.string().email("이메일 형식에 적합하지 않습니다.").min(1, "이메일을 입력해주세요"),
    nickname: zod.string().min(1, "닉네임을 입력해주세요."),
    password: zod.string().min(6, "최소 6자리 이상").max(15, "최대 15자").min(1, "비밀번호 필수임"),
    passwordConfirm: zod.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

interface IFieldData {
  title: string;
  placeHolder: string;
  validationKey: keyof IFormData;
  inputType: string;
}
export const FieldData: IFieldData[] = [
  { title: "E-mail", placeHolder: "Enter Email...", validationKey: "email", inputType: "text" },
  {
    title: "Password",
    placeHolder: "Enter Password...",
    validationKey: "password",
    inputType: "password",
  },
  {
    title: "Confirm",
    placeHolder: "Enter Password Confirm...",
    validationKey: "passwordConfirm",
    inputType: "password",
  },
  {
    title: "Nickname",
    placeHolder: "Enter Nickname...",
    validationKey: "nickname",
    inputType: "text",
  },
];
