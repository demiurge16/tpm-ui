import { useEffect, useRef, useState } from "react";
import { Project } from "../../client/types/project/Project";
import { FilterDefinition } from "../../components/grid/FilterDefinition";
import { GridHandle } from "../../components/grid/GridProps";
import { useBreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { useSnackbarContext } from "../../contexts/SnackbarContext";
import { Projects } from "./Projects";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Grid } from "../../components/grid/Grid";
import { Link } from "react-router-dom";
import { forkJoin, of } from "rxjs";
import { formatDate } from "../../utils/dateFormatters";
import { useTpmClient } from "../../contexts/TpmClientContext";
import { LoadingScreen } from "../utils/LoadingScreen";
import { GridConfig } from "../../components/grid/GridConfig";
import { useAuth } from "../../contexts/AuthContext";
import { SecuredComponent } from "../../components/security/SecuredComponent";

export const Index = () => {
  const gridRef = useRef<GridHandle>(null);

  const tpmClient = useTpmClient();
  const { hasAnyRole } = useAuth();

  const { showError } = useSnackbarContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();;

  const [gridConfig, setGridConfig] = useState<GridConfig<Project>>({
    page: 0,
    pageSize: 25,
    columnDefs: [],
    filters: []
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setBreadcrumbs([
      { label: 'Projects', path: '/projects' }
    ]);

    forkJoin({
      languages: tpmClient.languages().all(),
      accuracies: tpmClient.accuracies().all(),
      industries: tpmClient.industries().all(),
      units: tpmClient.units().all(),
      currencies: tpmClient.currencies().all(),
      statuses: tpmClient.projects().refdata().statuses(),
      clients: hasAnyRole(['admin', 'project-manager']) ? tpmClient.clients().all() : of({ items: [] })
    }).subscribe({
      next: (response) => {
        setGridConfig((prev) => {
          setLoading(false);

          const columnDefs = [
            {
              headerName: "Id",
              field: "id",
              resizable: true,
              lockVisible: true,
              suppressSizeToFit: true,
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
            { headerName: "Description", field: "description", resizable: true, hide: true },
            {
              headerName: "Language Pair (Source -> Target)",
              resizable: true,
              cellRenderer: (params: any) => {
                const project = params.data as Project;
                return `${project.sourceLanguage.name} -> ${project.targetLanguages.map((l: any) => l.name).join(", ")}`;
              }
            },
            {
              headerName: "Timeframe (Expected Start -> Internal Deadline -> External Deadline)",
              resizable: true,
              suppressSizeToFit: true,
              cellRenderer: (params: any) => {
                const project = params.data as Project;
                return `${formatDate(project.expectedStart)} -> ${formatDate(project.internalDeadline)} -> ${formatDate(project.externalDeadline)}`;
              }
            },
            {
              headerName: "Accuracy",
              field: "accuracy",
              resizable: true,
              suppressSizeToFit: true,
              cellRenderer: (params: any) => params.data.accuracy.name
            },
            {
              headerName: "Industry",
              field: "industry",
              resizable: true,
              suppressSizeToFit: true,
              cellRenderer: (params: any) => params.data.industry.name
            },
            {
              headerName: "Volume",
              resizable: true,
              suppressSizeToFit: true,
              cellRenderer: (params: any) => {
                const project = params.data as Project;
                return `${project.amount} ${project.unit.name}`
              }
            },
            {
              headerName: "Budget",
              resizable: true,
              suppressSizeToFit: true,
              cellRenderer: (params: any) => `${params.data.budget} ${params.data.currency.name}`
            },
            {
              headerName: "Status",
              field: "status",
              resizable: true,
              suppressSizeToFit: true,
              cellRenderer: (params: any) => params.data.status.title
            }
          ];
          hasAnyRole(['admin', 'project-manager']) && columnDefs.push({
            headerName: "Client",
            field: "client",
            suppressSizeToFit: true,
            resizable: true,
            cellRenderer: (params: any) => params.data.client.name
          });

          const filters = [
            FilterDefinition.uniqueToken("id", "Id"),
            FilterDefinition.string("title", "Title"),
            FilterDefinition.select(
              "sourceLanguage",
              "Source Language",
              response.languages.items.map(l => ({ label: l.name, value: l.code }))
            ),
            FilterDefinition.multiSelect(
              "targetLanguages",
              "Target Languages",
              response.languages.items.map(l => ({ label: l.name, value: l.code }))
            ),
            FilterDefinition.select(
              "accuracyId",
              "Accuracy",
              response.accuracies.items.map(a => ({ label: a.name, value: a.id }))
            ),
            FilterDefinition.select(
              "industryId",
              "Industry",
              response.industries.items.map(i => ({ label: i.name, value: i.id }))
            ),
            FilterDefinition.select(
              "unitId",
              "Unit",
              response.units.items.map(u => ({ label: u.name, value: u.id }))
            ),
            FilterDefinition.number("amount", "Amount"),
            FilterDefinition.datetime("expectedStart", "Expected Start"),
            FilterDefinition.datetime("internalDeadline", "Internal Deadline"),
            FilterDefinition.datetime("externalDeadline", "External Deadline"),
            FilterDefinition.number("budget", "Budget"),
            FilterDefinition.select(
              "currency",
              "Currency",
              response.currencies.items.map(c => ({ label: c.name, value: c.code }))
            ),
            FilterDefinition.select(
              "status",
              "Status",
              response.statuses.map(s => ({ label: s.title, value: s.status }))
            )
          ];

          hasAnyRole(['admin', 'project-manager']) && filters.push(
            FilterDefinition.select(
              "clientId",
              "Client",
              response.clients.items.map(c => ({ label: c.name, value: c.id }))
            )
          );

          return {
            page: 0,
            pageSize: 25,
            columnDefs: columnDefs,
            filters: filters
          };
        });
      },
      error: (error) => {
        showError("Error loading reference data", error.message);
      }
    });
  }, []);

  return (
    <Box>
      <Typography variant="h4">{Projects.title}</Typography>
      <Typography variant="subtitle1">{Projects.description}</Typography>
      <Box pb={2} />
      {
        loading ? (
          <Paper elevation={2} sx={{ p: 2 }}>
            <LoadingScreen />
          </Paper>
        ) : (
          <>
            <Grid<Project>
              innerRef={gridRef}
              startPage={gridConfig.page}
              pageSize={gridConfig.pageSize}
              fetch={tpmClient.projects().all}
              exportData={tpmClient.projects().export}
              filters={gridConfig.filters}
              columnDefinitions={gridConfig.columnDefs}
              elevation={2}
            />
            <Box pb={2} />

            <SecuredComponent roles={['admin', 'project-manager']}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <SecuredComponent roles={['admin', 'project-manager']}>
                  <Button variant="contained" component={Link} to="create">
                    Create new project
                  </Button>
                </SecuredComponent>
              </Paper>
            </SecuredComponent>
          </>
        )
      }
    </Box>
  );
};
