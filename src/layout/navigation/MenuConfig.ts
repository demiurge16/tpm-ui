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
import { useTranslation } from "react-i18next";

export type MenuItem = {
  icon: React.ElementType;
  label: React.ReactNode | React.ComponentType;
  path: string;
  roles: Role[];
};

export type MenuItemGroup = {
  icon: React.ElementType;
  label: React.ReactNode | React.ComponentType;
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

export function useMenuConfig(): MenuConfig {
  const { t } = useTranslation("translation", { keyPrefix: "layout.navigationDrawer" });

  return [
    {
      icon: ChecklistIcon,
      label: () => t("items.projects"),
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
      label: () => t("items.tasks"),
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
      label: () => t("items.expenses"),
      path: Expenses.path,
      roles: [
        "admin",
        "project-manager"
      ],
    },
    {
      icon: NoteAltIcon,
      label: () => t("items.threads"),
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
      label: () => t("items.clients"),
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
          label: () => t("items.clientTypes"),
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
      label: () => t("items.dictionaries"),
      items: [
        {
          icon: TranslateIcon,
          label: () => t("items.languages"),
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
          label: () => t("items.countries"),
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
          label: () => t("items.currencies"),
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
          label: () => t("items.accuracies"),
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
          label: () => t("items.expenseCategories"),
          path: ExpenseCategories.path,
          roles: [
            "admin",
            "project-manager"
          ],
        },
        {
          icon: ConstructionIcon,
          label: () => t("items.industries"),
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
          label: () => t("items.priorities"),
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
          label: () => t("items.translationUnits"),
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
          label: () => t("items.serviceTypes"),
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
      label: () => t("items.users"),
      path: Users.path,
      roles: [
        "admin",
        "project-manager"
      ],
    },
  ];
}
