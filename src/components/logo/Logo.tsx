import { SITE_NAME } from "@/common/constants";
interface ILogoProps {
  size: "text-logo-s" | "text-logo-l";
}
const Logo = ({ size = "text-logo-s" }: ILogoProps) => {
  return <div className={["font-logo", size].join(" ")}>{SITE_NAME}</div>;
};
export default Logo;
