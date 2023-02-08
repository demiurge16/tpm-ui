
export interface MenuProps {
  elements: Array<MenuItemProps | MenuDropdownProps>;
}

export interface MenuItemProps {
  label: string;
  route: string;
  component: React.FunctionComponent;
  onClick?: () => void;
}

export interface MenuDropdownProps {
  label: string;
  groups: {
    [key: string]: Array<MenuItemProps>;
  };
}

export class MenuConfig implements MenuProps {

  constructor (public readonly elements: Array<MenuItemProps | MenuDropdownProps>) {}

  flatten(): Array<MenuItemProps> {
    return this.elements.reduce((acc, item) => {
      if ('route' in item) {
        acc.push(item);
      } else {
        Object.keys(item.groups).forEach((group) => {
          acc.push(...item.groups[group]);
        });
      }
      return acc;
    }, [] as Array<MenuItemProps>);
  }
}
