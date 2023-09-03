import { useContext, useEffect, useRef, useState } from "react";
import { User } from "../../client/types/user/User";
import { FilterDefinition } from "../../components/grid/FilterDefinition";
import { ColumnDefinition, GridHandle } from "../../components/grid/GridProps";
import { BreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { SnackbarContext } from "../../contexts/SnackbarContext";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Users } from "./Users";
import { Grid } from "../../components/grid/Grid";
import { useTpmClient } from "../../contexts/TpmClientContext";

export const Index = () => {
  const startPage = 0;
  const pageSize = 25;

  const gridRef = useRef<GridHandle>(null);

  const tpmClient = useTpmClient();

  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  const [filterDefs, setFilterDefs] = useState<FilterDefinition[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColumnDefinition<User>[]>([]);

  useEffect(() => {
    breadcrumbsContext.setBreadcrumbs([
      { label: 'Users', path: '/users' }
    ]);

    setColumnDefs([
      {
        headerName: "Id",
        field: "id",
        resizable: true,
        lockVisible: true,
        cellRenderer: (params: any) => {
          const user = params.data as User;
          return (
            <Box>
              <Button variant="text" component={Link} to={`${user.id}`}>{user.id}</Button>
            </Box>
          );
        }
      },
      { headerName: "First name", field: "firstName", resizable: true },
      { headerName: "Last name", field: "lastName", resizable: true },
      { headerName: "Email", field: "email", resizable: true },
      {
        headerName: "Roles",
        field: "roles",
        resizable: true,
        cellRenderer: (params: any) => {
          const user = params.data as User;
          return user.roles.map((role) => role.title).join(", ");
        }
      }
    ]);

    setFilterDefs([
      FilterDefinition.uniqueToken("id", "Id"),
      FilterDefinition.string("firstName", "First name"),
      FilterDefinition.string("lastName", "Last name"),
      FilterDefinition.string("email", "Email")
    ]);
  }, []);

  return (
    <Box>
      <Typography variant="h4">{Users.title}</Typography>
      <Typography variant="subtitle1">{Users.description}</Typography>
      <Box pb={2} />
      <Grid<User>
        innerRef={gridRef}
        startPage={startPage}
        pageSize={pageSize}
        fetch={tpmClient.users().all}
        export={tpmClient.users().export}
        filters={filterDefs}
        columnDefinitions={columnDefs}
      />
    </Box>
  );
};
