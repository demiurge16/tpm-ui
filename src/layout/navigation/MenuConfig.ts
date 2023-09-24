import { Languages } from "../../pages/dictionaries/language/Languages";
import { Countries } from "../../pages/dictionaries/country/Countries";
import { Currencies } from "../../pages/dictionaries/currency/Currencies";
import { Accuracies } from "../../pages/dictionaries/accuracy/Accuracies";
import { ExpenseCategories } from "../../pages/dictionaries/expense-category/ExpenseCategories";
import { Industries } from "../../pages/dictionaries/industry/Industries";
import { Projects } from "../../pages/projects/Projects";
import { Tasks } from "../../pages/tasks/Tasks";
import { Expenses } from "../../pages/expenses/Expenses";
import { Threads } from "../../pages/threads/Threads";
import { Clients } from "../../pages/clients/Clients";
import { Priorities } from "../../pages/dictionaries/priority/Priorities";
import { Units } from "../../pages/dictionaries/unit/Units";
import { ClientTypes } from "../../pages/dictionaries/client-type/ClientTypes";
import { Users } from "../../pages/users/Users";
import ChecklistIcon from "@mui/icons-material/Checklist";
import TaskIcon from "@mui/icons-material/Task";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import WorkIcon from "@mui/icons-material/Work";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonIcon from "@mui/icons-material/Person";
import TranslateIcon from "@mui/icons-material/Translate";
import PublicIcon from "@mui/icons-material/Public";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ConstructionIcon from "@mui/icons-material/Construction";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import PercentIcon from "@mui/icons-material/Percent";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import { ServiceTypes } from "../../pages/dictionaries/service-types/ServiceTypes";
import { Role } from "../../contexts/AuthContext";

export type MenuItem = {
  icon: any;
  label: string;
  path: string;
  roles: Role[];
};

export type MenuItemGroup = {
  icon: any;
  label: string;
  items: MenuConfig;
};

export type MenuConfig = (MenuItem | MenuItemGroup)[];

export const isItem = (item: MenuItem | MenuItemGroup): item is MenuItem => {
  return 'path' in item;
};

export const isGroup = (item: MenuItem | MenuItemGroup): item is MenuItemGroup => {
  return 'items' in item;
};

export const flattenMenu = (menu: MenuConfig): MenuItem[] => {
  const items: MenuItem[] = [];

  menu.forEach(item => {
    if (isItem(item)) {
      items.push(item);
    } else if (isGroup(item)) {
      items.push(...flattenMenu(item.items));
    }
  });

  return items;
};

export const menuConfig: MenuConfig = [
  {
    icon: ChecklistIcon,
    label: Projects.title,
    path: Projects.path,
    roles: [
      "admin",
      "project-manager",
      "translator",
      "editor",
      "proofreader",
      "subject-matter-expert",
      "publisher",
      "observer"
    ],
  },
  {
    icon: TaskIcon,
    label: Tasks.title,
    path: Tasks.path,
    roles: [
      "admin",
      "project-manager",
      "translator",
      "editor",
      "proofreader",
      "subject-matter-expert",
      "publisher",
      "observer"
    ],

  },
  {
    icon: RequestQuoteIcon,
    label: Expenses.title,
    path: Expenses.path,
    roles: [
      "admin",
      "project-manager"
    ],
  },
  {
    icon: NoteAltIcon,
    label: Threads.title,
    path: Threads.path,
    roles: [
      "admin",
      "project-manager",
      "translator",
      "editor",
      "proofreader",
      "subject-matter-expert",
      "publisher",
      "observer"
    ],
  },
  {
    icon: WorkIcon,
    label: Clients.title,
    items: [
      {
        icon: WorkIcon,
        label: Clients.title,
        path: Clients.path,
        roles: [
          "admin",
          "project-manager"
        ],
      },
      {
        icon: HomeWorkIcon,
        label: ClientTypes.title,
        path: ClientTypes.path,
        roles: [
          "admin",
          "project-manager"
        ],
      }
    ]
  },
  {
    icon: MenuBookIcon,
    label: "Dictionaries",
    items: [
      {
        icon: TranslateIcon,
        label: Languages.title,
        path: Languages.path,
        roles: [
          "admin",
          "project-manager",
          "translator",
          "editor",
          "proofreader",
          "subject-matter-expert",
          "publisher",
          "observer",
        ],
      },
      {
        icon: PublicIcon,
        label: Countries.title,
        path: Countries.path,
        roles: [
          "admin",
          "project-manager",
          "translator",
          "editor",
          "proofreader",
          "subject-matter-expert",
          "publisher",
          "observer",
        ],
      },
      {
        icon: CurrencyExchangeIcon,
        label: Currencies.title,
        path: Currencies.path,
        roles: [
          "admin",
          "project-manager",
          "translator",
          "editor",
          "proofreader",
          "subject-matter-expert",
          "publisher",
          "observer",
        ],
      },
      {
        icon: FactCheckIcon,
        label: Accuracies.title,
        path: Accuracies.path,
        roles: [
          "admin",
          "project-manager",
          "translator",
          "editor",
          "proofreader",
          "subject-matter-expert",
          "publisher",
          "observer",
        ],
      },
      {
        icon: ProductionQuantityLimitsIcon,
        label: ExpenseCategories.title,
        path: ExpenseCategories.path,
        roles: [
          "admin",
          "project-manager"
        ],
      },
      {
        icon: ConstructionIcon,
        label: Industries.title,
        path: Industries.path,
        roles: [
          "admin",
          "project-manager",
          "translator",
          "editor",
          "proofreader",
          "subject-matter-expert",
          "publisher",
          "observer",
        ],
      },
      {
        icon: LowPriorityIcon,
        label: Priorities.title,
        path: Priorities.path,
        roles: [
          "admin",
          "project-manager",
          "translator",
          "editor",
          "proofreader",
          "subject-matter-expert",
          "publisher",
          "observer",
        ],
      },
      {
        icon: PercentIcon,
        label: Units.title,
        path: Units.path,
        roles: [
          "admin",
          "project-manager",
          "translator",
          "editor",
          "proofreader",
          "subject-matter-expert",
          "publisher",
          "observer",
        ],
      },
      {
        icon: DesignServicesIcon,
        label: ServiceTypes.title,
        path: ServiceTypes.path,
        roles: [
          "admin",
          "project-manager",
          "translator",
          "editor",
          "proofreader",
          "subject-matter-expert",
          "publisher",
          "observer",
        ]
      }
    ],
  },
  {
    icon: PersonIcon,
    label: Users.title,
    path: Users.path,
    roles: [
      "admin",
      "project-manager"
    ],
  },
];