
export class Menu {

  constructor (public readonly elements: Array<MenuItem | MenuDropdown>) {}

  flatten(): Array<MenuItem> {
    return this.elements.reduce((acc, item) => {
      if ('route' in item) {
        acc.push(item);
      } else {
        Object.keys(item.groups).forEach((group) => {
          acc.push(...item.groups[group]);
        });
      }
      return acc;
    }, [] as Array<MenuItem>);
  }
}

export interface MenuItem {
  label: string;
  route: string;
  component: React.FunctionComponent;
}

export interface MenuDropdown {
  label: string;
  groups: {
    [key: string]: Array<MenuItem>;
  };
}
