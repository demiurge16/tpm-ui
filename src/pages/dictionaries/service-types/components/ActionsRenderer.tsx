import { ICellRendererParams } from "ag-grid-community";
import { ServiceType } from "../../../../client/types/dictionaries/ServiceType";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { applicationClient } from "../../../../client/ApplicationClient";
import { useSnackbarContext } from "../../../../contexts/SnackbarContext";
import { useTranslation } from "react-i18next";

export const ActionsRenderer = ({ data: serviceType, api }: ICellRendererParams<ServiceType>) => {
  const { showSuccess, showError } = useSnackbarContext();
  const { t } = useTranslation("translation", { keyPrefix: "serviceTypes.index" });

  if (!serviceType) {
    return null;
  }

  const activate = (id: string) => {
    applicationClient.serviceTypes().withId(id).activate()
      .subscribe({
        next: (response) => {
          showSuccess('Success', `Activated ${id}`);

          const rowNode = api.getRowNode(id);
          rowNode && rowNode.setData(
            { ...serviceType, active: response.active }
          );
          api.refreshCells();
        },
        error: (error) => {
          showError(`Error activating ${id}`, error.message);
        }
      });
  };

  const deactivate = (id: string) => {
    applicationClient.serviceTypes().withId(id).deactivate()
      .subscribe({
        next: (response) => {
          showSuccess('Success', `Deactivated ${id}`);

          const rowNode = api.getRowNode(id);
          rowNode && rowNode.setData(
            { ...serviceType, active: response.active }
          );
          api.refreshCells();
        },
        error: (error) => {
          showError(`Error deactivating ${id}`, error.message);
        }
      });
  };

  return (
    <Box>
      <Box component="span" pr={2}>
        <Button variant="text" startIcon={<EditIcon />} component={Link} to={`${serviceType.id}/edit`}>
          {t('grid.actions.edit')}
        </Button>
      </Box>

      {
        serviceType.active ?
          <Box component="span" pr={2}>
            <Button variant="text" startIcon={<DeleteIcon />} onClick={() => deactivate(serviceType.id)}>
              {t('grid.actions.deactivate')}
            </Button>
          </Box> :
          <Box component="span" pr={2}>
            <Button variant="text" startIcon={<RestoreFromTrashIcon />} onClick={() => activate(serviceType.id)}>
              {t('grid.actions.activate')}
            </Button>
          </Box>
      }
    </Box>
  );
};
