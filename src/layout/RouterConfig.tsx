import { Navigate, Route, Routes } from "react-router-dom";
import { Role } from "../contexts/AuthContext";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { Units } from "../pages/dictionaries/unit/Units";
import { Priorities } from "../pages/dictionaries/priority/Priorities";
import { Industries } from "../pages/dictionaries/industry/Industries";
import { ExpenseCategories } from "../pages/dictionaries/expense-category/ExpenseCategories";
import { Accuracies } from "../pages/dictionaries/accuracy/Accuracies";
import { ClientTypes } from "../pages/dictionaries/client-type/ClientTypes";
import { Currencies } from "../pages/dictionaries/currency/Currencies";
import { Countries } from "../pages/dictionaries/country/Countries";
import { Languages } from "../pages/dictionaries/language/Languages";
import { Clients } from "../pages/clients/Clients";
import { Projects } from "../pages/projects/Projects";
import { Tasks } from "../pages/tasks/Tasks";
import { Expenses } from "../pages/expenses/Expenses";
import { Threads } from "../pages/threads/Threads";
import { Users } from "../pages/users/Users";
import { ServiceTypes } from "../pages/dictionaries/service-types/ServiceTypes";
import { SecuredRoute } from "../components/routing/SecuredRoute";
import { Errors } from "../pages/errors/Errors";

type RouteConfig = {
  path: string;
  roles: Role[];
  element: JSX.Element;
};

const routerConfig: RouteConfig[] = [
  {
    path: "/",
    roles: [
      "admin",
      "project-manager",
      "translator",
      "editor",
      "proofreader",
      "subject-matter-expert",
      "publisher",
      "observer",
      "user",
    ],
    element: <Navigate to="/dashboard" />,
  },
  {
    path: "/dashboard",
    roles: [
      "admin",
      "project-manager",
      "translator",
      "editor",
      "proofreader",
      "subject-matter-expert",
      "publisher",
      "observer",
      "user",
    ],
    element: <Dashboard />,
  },
  {
    path: "/projects",
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
    element: <Projects.Index />,
  },
  {
    path: "/projects/create",
    roles: ["admin", "project-manager"],
    element: <Projects.Create />,
  },
  {
    path: "/projects/:id/edit",
    roles: ["admin", "project-manager"],
    element: <Projects.Edit />,
  },
  {
    path: "/projects/:id",
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
    element: <Projects.Details />,
  },
  {
    path: "/tasks",
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
    element: <Tasks.Index />,
  },
  {
    path: "/projects/:projectId/tasks/create",
    roles: ["admin", "project-manager"],
    element: <Tasks.Create />,
  },
  {
    path: "/tasks/:id/edit",
    roles: ["admin", "project-manager"],
    element: <Tasks.Edit />,
  },
  {
    path: "/tasks/:id",
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
    element: <Tasks.Details />,
  },
  {
    path: "/expenses",
    roles: ["admin", "project-manager"],
    element: <Expenses.Index />,
  },
  {
    path: "/projects/:projectId/expenses/create",
    roles: ["admin", "project-manager"],
    element: <Expenses.Create />,
  },
  {
    path: "/threads",
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
    element: <Threads.Index />,
  },
  {
    path: "/projects/:projectId/threads/create",
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
    element: <Threads.Create />,
  },
  {
    path: "/threads/:id/edit",
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
    element: <Threads.Edit />,
  },
  {
    path: "/threads/:id",
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
    element: <Threads.Details />,
  },
  {
    path: "/clients",
    roles: ["admin", "project-manager"],
    element: <Clients.Index />,
  },
  {
    path: "/clients/create",
    roles: ["admin", "project-manager"],
    element: <Clients.Create />,
  },
  {
    path: "/clients/:id/edit",
    roles: ["admin", "project-manager"],
    element: <Clients.Edit />,
  },
  {
    path: "/clients/:id",
    roles: ["admin", "project-manager"],
    element: <Clients.Details />,
  },
  {
    path: "/languages",
    roles: ["admin", "project-manager"],
    element: <Languages.Index />,
  },
  {
    path: "/languages/:id",
    roles: ["admin", "project-manager"],
    element: <Languages.Details />,
  },
  {
    path: "/countries",
    roles: ["admin", "project-manager"],
    element: <Countries.Index />,
  },
  {
    path: "/countries/:id",
    roles: ["admin", "project-manager"],
    element: <Countries.Details />,
  },
  {
    path: "/currencies",
    roles: ["admin", "project-manager"],
    element: <Currencies.Index />,
  },
  {
    path: "/currencies/:id",
    roles: ["admin", "project-manager"],
    element: <Currencies.Details />,
  },
  {
    path: "/accuracies",
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
    element: <Accuracies.Index />,
  },
  {
    path: "/accuracies/create",
    roles: ["admin", "project-manager"],
    element: <Accuracies.Create />,
  },
  {
    path: "/accuracies/:id/edit",
    roles: ["admin", "project-manager"],
    element: <Accuracies.Edit />,
  },
  {
    path: "/accuracies/:id",
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
    element: <Accuracies.Details />,
  },
  {
    path: "/expense-categories",
    roles: ["admin", "project-manager"],
    element: <ExpenseCategories.Index />,
  },
  {
    path: "/expense-categories/create",
    roles: ["admin", "project-manager"],
    element: <ExpenseCategories.Create />,
  },
  {
    path: "/expense-categories/:id/edit",
    roles: ["admin", "project-manager"],
    element: <ExpenseCategories.Edit />,
  },
  {
    path: "/expense-categories/:id",
    roles: ["admin", "project-manager"],
    element: <ExpenseCategories.Details />,
  },
  {
    path: "/industries",
    roles: ["admin", "project-manager"],
    element: <Industries.Index />,
  },
  {
    path: "/industries/create",
    roles: ["admin", "project-manager"],
    element: <Industries.Create />,
  },
  {
    path: "/industries/:id/edit",
    roles: ["admin", "project-manager"],
    element: <Industries.Edit />,
  },
  {
    path: "/industries/:id",
    roles: ["admin", "project-manager"],
    element: <Industries.Details />,
  },
  {
    path: "/priorities",
    roles: ["admin", "project-manager"],
    element: <Priorities.Index />,
  },
  {
    path: "/priorities/create",
    roles: ["admin", "project-manager"],
    element: <Priorities.Create />,
  },
  {
    path: "/priorities/:id/edit",
    roles: ["admin", "project-manager"],
    element: <Priorities.Edit />,
  },
  {
    path: "/priorities/:id",
    roles: ["admin", "project-manager"],
    element: <Priorities.Details />,
  },
  {
    path: "/service-types",
    roles: ["admin", "project-manager"],
    element: <ServiceTypes.Index />,
  },
  {
    path: "/service-types/create",
    roles: ["admin", "project-manager"],
    element: <ServiceTypes.Create />,
  },
  {
    path: "/service-types/:id/edit",
    roles: ["admin", "project-manager"],
    element: <ServiceTypes.Edit />,
  },
  {
    path: "/service-types/:id",
    roles: ["admin", "project-manager"],
    element: <ServiceTypes.Details />,
  },
  {
    path: "/units",
    roles: ["admin", "project-manager"],
    element: <Units.Index />,
  },
  {
    path: "/units/create",
    roles: ["admin", "project-manager"],
    element: <Units.Create />,
  },
  {
    path: "/units/:id/edit",
    roles: ["admin", "project-manager"],
    element: <Units.Edit />,
  },
  {
    path: "/units/:id",
    roles: ["admin", "project-manager"],
    element: <Units.Details />,
  },
  {
    path: "/client-types",
    roles: ["admin", "project-manager"],
    element: <ClientTypes.Index />,
  },
  {
    path: "/client-types/create",
    roles: ["admin", "project-manager"],
    element: <ClientTypes.Create />,
  },
  {
    path: "/client-types/:id/edit",
    roles: ["admin", "project-manager"],
    element: <ClientTypes.Edit />,
  },
  {
    path: "/client-types/:id",
    roles: ["admin", "project-manager"],
    element: <ClientTypes.Details />,
  },
  {
    path: "/users",
    roles: ["admin", "project-manager"],
    element: <Users.Index />,
  },
  {
    path: "/users/:id",
    roles: ["admin", "project-manager"],
    element: <Users.Details />,
  },
];

export const RouterConfig = () => {
  return (
    <Routes>
      {
        routerConfig.map((item, index) => {
          return (
            <Route
              key={`route-${index}`}
              path={item.path}
              element={
                <SecuredRoute roles={item.roles}>{item.element}</SecuredRoute>
              }
            />
          );
        })
      }
      <Route path="/forbidden" element={<Errors.Forbidden />} />
      <Route path="/internal-server-error" element={<Errors.InternalServerError />} />
      <Route path="*" element={<Errors.NotFound />} />
    </Routes>
  );
}
