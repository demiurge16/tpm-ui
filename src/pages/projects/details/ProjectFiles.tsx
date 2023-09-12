import { useContext, useRef, useState, useEffect } from 'react';
import { GridHandle } from '../../../components/grid/GridProps';
import { SnackbarContext } from '../../../contexts/SnackbarContext';
import { useProjectContext } from './ProjectContext';
import { FilterDefinition } from '../../../components/grid/FilterDefinition';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Grid } from '../../../components/grid/Grid';
import { File } from '../../../client/types/file/File';
import { Link } from 'react-router-dom';
import { User } from '../../../client/types/user/User';
import { forkJoin } from 'rxjs';
import { useTpmClient } from '../../../contexts/TpmClientContext';
import { GridConfig } from '../../../components/grid/GridConfig';
import { LoadingScreen } from '../../utils/LoadingScreen';

export const ProjectFiles = () => {
  const gridRef = useRef<GridHandle>(null);

  const [gridConfig, setGridConfig] = useState<GridConfig<File>>({
    page: 0,
    pageSize: 25,
    columnDefs: [],
    filters: []
  });
  const [loading, setLoading] = useState<boolean>(true);

  const snackbarContext = useContext(SnackbarContext);
  const { project, setProject } = useProjectContext();
  const tpmClient = useTpmClient();

  useEffect(() => {
    forkJoin({
      users: tpmClient.users().all()
    }).subscribe({
      next: (result) => {
        const users = result.users.items as User[];

        setGridConfig(prev => {
          setLoading(false);
          return {
            page: 0,
            pageSize: 25,
            columnDefs: [
              {
                headerName: 'Id',
                field: 'id',
                resizable: true,
                lockVisible: true
              },
              {
                headerName: 'Name',
                field: 'name',
                resizable: true,
                lockVisible: true
              },
              {
                headerName: "Upload date",
                field: "uploadTime",
                resizable: true,
                hide: true
              },
              {
                headerName: "Uploader",
                field: "uploader",
                resizable: true,
                cellRenderer: (params: any) => {
                  const file = params.data as File;
                  return `${file.uploader.firstName} ${file.uploader.lastName}`;
                }
              },
              {
                headerName: 'Actions',
                field: 'actions',
                resizable: true,
                lockVisible: true,
                cellRenderer: (params: any) => {
                  const file = params.data as File;
                  return (
                    <Box>
                      <Button variant="text" component={Link} to={`${file.id}`}>
                        Download
                      </Button>
                    </Box>
                  );
                }
              }
            ],
            filters: [
              FilterDefinition.uniqueToken('id', 'Id'),
              FilterDefinition.string('name', 'Name'),
              FilterDefinition.date('uploadTime', 'Upload date'),
              FilterDefinition.select('uploader', 'Uploader', users.map((user) => ({ value: user.id, label: `${user.firstName} ${user.lastName}` }))),
            ]
          };
        });
      },
      error: (error) => snackbarContext.showError(error.message, error.response.data.message),
    });
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Project files</Typography>
      <Box pb={2} />
      {
        loading ? (
          <Paper elevation={2} sx={{ p: 2 }}>
            <LoadingScreen />
          </Paper>
        ) : (
          <>
            <Grid<File>
              innerRef={gridRef}
              startPage={gridConfig.page}
              pageSize={gridConfig.pageSize}
              fetch={tpmClient.projects().withId(project.id).files().all}
              export={tpmClient.projects().withId(project.id).files().export}
              filters={gridConfig.filters}
              columnDefinitions={gridConfig.columnDefs}
              elevation={2}
            />
            <Box pb={2} />
            <Paper elevation={2} sx={{ p: 2 }}>
              <Button variant="contained" component={Link} to="create">Create</Button>
            </Paper>
          </>
        )
      }
    </Box>
  );
}