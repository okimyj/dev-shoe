import { Link } from "react-router-dom";

interface INavLinkProps {
  name: string;
  path: string;
}
const NavLink = ({ name, path }: INavLinkProps) => {
  return <Link to={path}>{name}</Link>;
};
const Navigation = () => {
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
    </nav>
  );
};
export default Navigation;