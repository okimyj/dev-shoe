import useAuthAPI from "@/apis/auth";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface INavLinkProps {
  name: string;
  path: string;
}
const NavLink = ({ name, path }: INavLinkProps) => {
  return <Link to={path}>{name}</Link>;
};
const Navigation = () => {
  const [isSaller, setIsSeller] = useState<boolean>(false);
  const { userData } = useAuth();
  const { signOut } = useAuthAPI();
  useEffect(() => {
    setIsSeller(userData?.isSeller ?? false);
  }, []);
  const handleLogout = () => {
    signOut();
  };
  // todo : user type 에 따라 분기처리.
  const USER_NAVIGATION = [
    {
      name: "New",
      path: "products/new",
    },
  ];
  return (
    <nav>
      {USER_NAVIGATION.map((el, idx) => (
        <NavLink key={idx} name={el.name} path={el.path} />
      ))}
      <Label onClick={handleLogout}>Logout</Label>
    </nav>
  );
};
export default Navigation;
