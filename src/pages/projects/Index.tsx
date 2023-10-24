import { useEffect, useRef, useState } from "react";
import { Project } from "../../client/types/project/Project";
import { FilterDefinition } from "../../components/grid/FilterDefinition";
import { GridHandle } from "../../components/grid/GridProps";
import { useBreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { useSnackbarContext } from "../../contexts/SnackbarContext";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Grid } from "../../components/grid/Grid";
import { Link } from "react-router-dom";
import { forkJoin, of } from "rxjs";
import { formatDate } from "../../utils/dateFormatters";
import { applicationClient } from "../../client/ApplicationClient";
import { LoadingScreen } from "../utils/LoadingScreen";
import { GridConfig } from "../../components/grid/GridConfig";
import { useAuth } from "../../contexts/AuthContext";
import { SecuredComponent } from "../../components/security/SecuredComponent";
import { useTranslation } from "react-i18next";

export const Index = () => {
  const gridRef = useRef<GridHandle>(null);

  const { hasAnyRole } = useAuth();

  const { showError } = useSnackbarContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();
  const { t } = useTranslation('translation', { keyPrefix: 'projects.index' });

  const [gridConfig, setGridConfig] = useState<GridConfig<Project>>({
    page: 0,
    pageSize: 25,
    columnDefs: [],
    filters: []
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setBreadcrumbs([
      { 
        label: () => <>{t('breadcrumbs.index')}</>,
        path: '/projects'
      }
    ]);

    forkJoin({
      languages: applicationClient.languages().all(),
      accuracies: applicationClient.accuracies().all(),
      industries: applicationClient.industries().all(),
      units: applicationClient.units().all(),
      currencies: applicationClient.currencies().all(),
      statuses: applicationClient.projects().refdata().statuses(),
      clients: hasAnyRole(['admin', 'project-manager']) ? applicationClient.clients().all() : of({ items: [] })
    }).subscribe({
      next: (response) => {
        setGridConfig(() => {
          setLoading(false);

          const columnDefs = [
            {
              headerComponent: () => (
                <>
                  {t('grid.id')}
                </>
              ),
              field: "id",
              resizable: true,
              lockVisible: true,
              suppressSizeToFit: true,
              cellRenderer: (params: any) => {
                const project = params.data as Project;
                return (
                  <Box>
                    <Button variant="text" component={Link} to={`${project.id}`}>{project.id}</Button>
                  </Box>
                );
              },
            },
            {
              headerComponent: () => (
                <>
                  {t('grid.title')}
                </>
              ),
              field: "title",
              resizable: true
            },
            {
              headerComponent: () => (
                <>
                  {t('grid.description')}
                </>
              ),
              field: "description",
              resizable: true,
              hide: true
            },
            {
              headerComponent: () => (
                <>
                  {t('grid.languagePair')}
                </>
              ),
              resizable: true,
              cellRenderer: (params: any) => {
                const project = params.data as Project;
                return `${project.sourceLanguage.name} -> ${project.targetLanguages.map(l => l.name).join(", ")}`;
              }
            },
            {
              headerComponent: () => (
                <>
                  {t('grid.timeframe')}
                </>
              ),
              resizable: true,
              suppressSizeToFit: true,
              cellRenderer: (params: any) => {
                const project = params.data as Project;
                return `${formatDate(project.expectedStart)} -> ${formatDate(project.internalDeadline)} -> ${formatDate(project.externalDeadline)}`;
              }
            },
            {
              headerComponent: () => (
                <>
                  {t('grid.accuracy')}
                </>
              ),
              field: "accuracy",
              resizable: true,
              suppressSizeToFit: true,
              cellRenderer: (params: any) => params.data.accuracy.name
            },
            {
              headerComponent: () => (
                <>
                  {t('grid.industry')}
                </>
              ),
              field: "industry",
              resizable: true,
              suppressSizeToFit: true,
              cellRenderer: (params: any) => params.data.industry.name
            },
            {
              headerComponent: () => (
                <>
                  {t('grid.volume')}
                </>
              ),
              resizable: true,
              suppressSizeToFit: true,
              cellRenderer: (params: any) => {
                const project = params.data as Project;
                return `${project.amount} ${project.unit.name}`
              }
            },
            {
              headerComponent: () => (
                <>
                  {t('grid.budget')}
                </>
              ),
              resizable: true,
              suppressSizeToFit: true,
              cellRenderer: (params: any) => `${params.data.budget} ${params.data.currency.name}`
            },
            {
              headerComponent: () => (
                <>
                  {t('grid.status')}
                </>
              ),
              field: "status",
              resizable: true,
              suppressSizeToFit: true,
              cellRenderer: (params: any) => params.data.status.title
            }
          ];
          hasAnyRole(['admin', 'project-manager']) && columnDefs.push({
            headerComponent: () => (
              <>
                {t('grid.client')}
              </>
            ),
            field: "client",
            suppressSizeToFit: true,
            resizable: true,
            cellRenderer: (params: any) => params.data.client.name
          });

          const filters = [
            FilterDefinition.uniqueToken("id", () => <>{t("grid.filters.id")}</>),
            FilterDefinition.string("title", () => <>{t("grid.filters.title")}</>),
            FilterDefinition.select(
              "sourceLanguage",
              () => <>{t("grid.filters.sourceLanguage")}</>,
              response.languages.items.map(l => ({ label: l.name, value: l.code }))
            ),
            FilterDefinition.multiSelect(
              "targetLanguages",
              () => <>{t("grid.filters.targetLanguages")}</>,
              response.languages.items.map(l => ({ label: l.name, value: l.code }))
            ),
            FilterDefinition.select(
              "accuracyId",
              () => <>{t("grid.filters.accuracy")}</>,
              response.accuracies.items.map(a => ({ label: a.name, value: a.id }))
            ),
            FilterDefinition.select(
              "industryId",
              () => <>{t("grid.filters.industry")}</>,
              response.industries.items.map(i => ({ label: i.name, value: i.id }))
            ),
            FilterDefinition.select(
              "unitId",
              () => <>{t("grid.filters.unit")}</>,
              response.units.items.map(u => ({ label: u.name, value: u.id }))
            ),
            FilterDefinition.number("amount", () => <>{t("grid.filters.amount")}</>),
            FilterDefinition.datetime("expectedStart", () => <>{t("grid.filters.expectedStart")}</>),
            FilterDefinition.datetime("internalDeadline", () => <>{t("grid.filters.internalDeadline")}</>),
            FilterDefinition.datetime("externalDeadline", () => <>{t("grid.filters.externalDeadline")}</>),
            FilterDefinition.number("budget", () => <>{t("grid.filters.budget")}</>),
            FilterDefinition.select(
              "currency",
              () => <>{t("grid.filters.currency")}</>,
              response.currencies.items.map(c => ({ label: c.name, value: c.code }))
            ),
            FilterDefinition.select(
              "status",
              () => <>{t("grid.filters.status")}</>,
              response.statuses.map(s => ({ label: s.title, value: s.status }))
            )
          ];

          hasAnyRole(['admin', 'project-manager']) && filters.push(
            FilterDefinition.select(
              "clientId",
              () => <>{t("grid.filters.client")}</>,
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
      <Typography variant="h4">{t('title')}</Typography>
      <Typography variant="subtitle1">{t('description')}</Typography>
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
              fetch={applicationClient.projects().all}
              exportData={applicationClient.projects().export}
              filters={gridConfig.filters}
              columnDefinitions={gridConfig.columnDefs}
              elevation={2}
            />
            <Box pb={2} />

            <SecuredComponent roles={['admin', 'project-manager']}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <SecuredComponent roles={['admin', 'project-manager']}>
                  <Button variant="contained" component={Link} to="create">
                    {t('actions.create')}
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
