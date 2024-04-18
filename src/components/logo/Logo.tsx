import { SITE_NAME } from "@/common/constants";
interface ILogoProps {
  size: "s" | "l";
}
const Logo = ({ size = "s" }: ILogoProps) => {
  return <div className={["font-logo", `text-logo-${size}`].join(" ")}>{SITE_NAME}</div>;
};
export default Logo;
