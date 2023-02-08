import { MenuConfig, MenuProps } from "./MenuConfig";
import { MenuDropdown } from "./MenuDropdown";
import { MenuLink } from "./MenuLink";

export const Navbar = (props: MenuProps) => {
  const { elements } = new MenuConfig(props.elements);

  return (
    <>
      {
        elements.map((item) => {
          if ('groups' in item) {
            return (
              <MenuDropdown {...item} />
            );
          } else {
            return (
              <MenuLink {...item} />
            );
          }
        })
      }
    </>
  );
}
