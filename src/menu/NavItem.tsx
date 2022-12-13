import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MenuItem } from "./Menu";

export interface NavItemProps extends MenuItem {

}

export default function NavItem(props: NavItemProps) {
  return (
    <Nav.Link as={Link} to={props.route}>{props.label}</Nav.Link>
  );
}