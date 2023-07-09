import { useContext, useEffect, useRef, useState } from "react";
import { Project } from "../../client/types/project/Project";
import { FilterDefinition } from "../../components/grid/FilterDefinition";
import { ColumnDefinition, GridHandle } from "../../components/grid/GridProps";
import { BreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { SnackbarContext } from "../../contexts/SnackbarContext";
import { Projects } from "./Projects";
import { Box, Button, Typography } from "@mui/material";
import { Grid } from "../../components/grid/Grid";
import TpmClient from "../../client/TpmClient";
import { Link } from "react-router-dom";
import { forkJoin } from "rxjs";

export const Index = () => {
  const startPage = 0;
  const pageSize = 25;

  const gridRef = useRef<GridHandle>(null);

  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  const [columnDefs, setColumnDefs] = useState<Array<ColumnDefinition<Project>>>([]);
  const [filters, setFilters] = useState<FilterDefinition[]>([]);

  useEffect(() => {
    breadcrumbsContext.setBreadcrumbs([
      { label: 'Projects', path: '/projects' }
    ]);

    forkJoin({
      languages: TpmClient.getInstance().languages().all(),
      accuracies: TpmClient.getInstance().accuracies().all(),
      industries: TpmClient.getInstance().industries().all(),
      units: TpmClient.getInstance().units().all(),
      currencies: TpmClient.getInstance().currencies().all(),
      statuses: TpmClient.getInstance().projects().refdata().statuses(),
      clients: TpmClient.getInstance().clients().all()
    }).subscribe({
      next: (response) => {
        setFilters([
          FilterDefinition.string("name", "Name"),
          FilterDefinition.string("description", "Description"),
          FilterDefinition.select(
            "language",
            "Language",
            response.languages.items.map(l => ({ label: l.name, value: l.code }))
          ),
          FilterDefinition.select(
            "accuracy",
            "Accuracy",
            response.accuracies.items.map(a => ({ label: a.name, value: a.id }))
          ),
          FilterDefinition.select(
            "industry",
            "Industry",
            response.industries.items.map(i => ({ label: i.name, value: i.id }))
          ),
          FilterDefinition.select(
            "unit",
            "Unit",
            response.units.items.map(u => ({ label: u.name, value: u.id }))
          ),
          FilterDefinition.datetime("expectedStart", "Expected Start"),
          FilterDefinition.datetime("internalDeadline", "Internal Deadline"),
          FilterDefinition.datetime("externalDeadline", "External Deadline"),
          FilterDefinition.select(
            "currency",
            "Currency",
            response.currencies.items.map(c => ({ label: c.name, value: c.code }))
          ),
          FilterDefinition.select(
            "status",
            "Status",
            response.statuses.map(s => ({ label: s.name, value: s.status }))
          ),
          FilterDefinition.select(
            "client",
            "Client",
            response.clients.items.map(c => ({ label: c.name, value: c.id }))
          )
        ]);

        setColumnDefs([
          {
            headerName: "Id",
            field: "id",
            resizable: true,
            lockVisible: true,
            cellRenderer: (params: any) => {
              const priority = params.data as Project;
              return (
                <Box>
                  <Button variant="text" component={Link} to={`${priority.id}`}>{priority.id}</Button>
                </Box>
              );
            },
          },
          { headerName: "Title", field: "title", resizable: true },
          { headerName: "Description", field: "description", resizable: true },
          { 
            headerName: "Source Language",
            field: "sourceLanguage",
            resizable: true,
            cellRenderer: (params: any) => params.data.sourceLanguage.name
          },
          {
            headerName: "Target Languages",
            field: "targetLanguages",
            resizable: true,
            cellRenderer: (params: any) => params.data.targetLanguages.map((l: any) => l.name).join(", ")
          },
          {
            headerName: "Accuracy",
            field: "accuracy",
            resizable: true,
            cellRenderer: (params: any) => params.data.accuracy.name
          },
          {
            headerName: "Industry",
            field: "industry",
            resizable: true,
            cellRenderer: (params: any) => params.data.industry.name
          },
          {
            headerName: "Amount",
            resizable: true,
            cellRenderer: (params: any) => `${params.data.amount} ${params.data.unit.name}`
          },
          {
            headerName: "Budget",
            resizable: true,
            cellRenderer: (params: any) => `${params.data.budget} ${params.data.currency.name}`
          },
          {
            headerName: "Status",
            field: "status",
            resizable: true,
            cellRenderer: (params: any) => params.data.status.name
          },
          {
            headerName: "Client",
            field: "client",
            resizable: true,
            cellRenderer: (params: any) => params.data.client.name
          }
        ]);
      },
      error: (error) => {
        snackbarContext.showError("Error loading reference data", error.message);
      }
    });
  }, []);

  return (
    <Box>
      <Typography variant="h4">{Projects.title}</Typography>
      <Typography variant="subtitle1">{Projects.description}</Typography>
      <Box pb={2} />
      <Grid<Project>
        innerRef={gridRef}
        startPage={startPage}
        pageSize={pageSize}
        fetch={TpmClient.getInstance().projects().all}
        filters={filters}
        columnDefinitions={columnDefs}
      />
      <Box pb={2} />
      <Button variant="contained" component={Link} to="create">
        Create
      </Button>
    </Box>
  );
};
