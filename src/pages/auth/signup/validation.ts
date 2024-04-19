import * as yup from "yup";
export interface IFormData {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
  isSeller?: boolean;
}

interface IFieldData {
  title: string;
  placeHolder: string;
  validationKey: keyof IFormData;
  inputType: string;
}
export const schema = yup.object({
  email: yup.string().email("이메일 형식에 적합하지 않습니다.").required("이메일을 입력해주세요"),
  nickname: yup.string().required("닉네임을 입력해주세요."),
  password: yup.string().min(6, "최소 6자리 이상").max(15, "최대 15자").required("비밀번호 필수임"),
  passwordConfirm: yup
    .string()
    .test("passwords-match", "비밀번호 확인 하셈", function (value) {
      return this.parent.password === value;
    })
    .required(),
});
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
