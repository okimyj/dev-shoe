import Logo from "../../../components/logo/Logo";
import Navigation from "./nav/Navigation";

const Header = () => {
  return (
    <header className="flex h-[60px] w-full border">
      <Logo size="text-logo-s" />
      <Navigation />
    </header>
  );
};
export default Header;
