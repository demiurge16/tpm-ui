import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { FilterDefinition } from "../../../components/grid/FilterDefinition";
import { Grid } from "../../../components/grid/Grid";
import { ServiceType } from "../../../client/types/dictionaries/ServiceType";
import { applicationClient } from "../../../client/ApplicationClient";
import { useBreadcrumbs } from "../../../contexts/BreadcrumbsContext";
import { IdRenderer } from "./components/IdRenderer";
import { ActionsRenderer } from "./components/ActionsRenderer";
import { useTranslation } from "react-i18next";
import { Translate } from "../../../components/i18n/Translate";
import { SecuredComponent } from "../../../components/security/SecuredComponent";

const Index = () => {
  const { t } = useTranslation("translation", { keyPrefix: "serviceTypes.index" });

  useBreadcrumbs([
    { label: () => <Translate t={t} tKey='breadcrumbs.index'/>, path: "/service-types" }
  ]);

  const startPage = 0;
  const pageSize = 25;
  const columnDefs = [
    {
      headerComponent: () => <Translate t={t} tKey='grid.id'/>,
      field: "id",
      resizable: true,
      lockVisible: true,
      cellRenderer: IdRenderer
    },
    {
      headerComponent: () => <Translate t={t} tKey='grid.name' />,
      field: "name",
      resizable: true
    },
    {
      headerComponent: () => <Translate t={t} tKey='grid.description' />,
      field: "description",
      resizable: true
    },
    {
      headerComponent: () => <Translate t={t} tKey='grid.active' />,
      field: "active",
      resizable: true
    },
    {
      headerComponent: () => <Translate t={t} tKey='grid.value' />,
      field: "value",
      resizable: true
    },
    {
      headerComponent: () => <Translate t={t} tKey='grid.emoji' />,
      field: "emoji",
      resizable: true
    },
    {
      headerComponent: () => <Translate t={t} tKey='grid.actions.columnTitle' />,
      resizable: true,
      lockVisible: true,
      cellRenderer: ActionsRenderer
    }
  ];
  const filterDefs = [
    FilterDefinition.uniqueToken("id", () => <Translate t={t} tKey='grid.filters.id' />),
    FilterDefinition.string("name", () => <Translate t={t} tKey='grid.filters.name' />),
    FilterDefinition.boolean("active", () => <Translate t={t} tKey='grid.filters.active' />)
  ];

  return (
    <Box>
      <Typography variant="h4">{t('title')}</Typography>
      <Typography variant="subtitle1">{t('description')}</Typography>
      <Box pb={2} />
      <Grid<ServiceType>
        startPage={startPage}
        pageSize={pageSize}
        getRowId={(row) => row.data.id}
        fetch={applicationClient.serviceTypes().all}
        exportData={applicationClient.serviceTypes().export}
        filters={filterDefs}
        columnDefinitions={columnDefs}
        elevation={2}
      />
      <Box pb={2} />

      <SecuredComponent roles={['admin', 'project-manager']}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Button variant="contained" component={Link} to="create">{t('actions.create')}</Button>
        </Paper>
      </SecuredComponent>
    </Box>
  );
};

export default Index;
