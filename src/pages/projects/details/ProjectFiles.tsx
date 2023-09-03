import { useContext, useRef, useState, useEffect } from 'react';
import { ColumnDefinition, GridHandle } from '../../../components/grid/GridProps';
import { SnackbarContext } from '../../../contexts/SnackbarContext';
import { useProjectContext } from './ProjectContext';
import { FilterDefinition } from '../../../components/grid/FilterDefinition';
import { Box, Button, Typography } from '@mui/material';
import { Grid } from '../../../components/grid/Grid';
import { File } from '../../../client/types/file/File';
import { Link } from 'react-router-dom';
import { User } from '../../../client/types/user/User';
import { forkJoin } from 'rxjs';
import { useTpmClient } from '../../../contexts/TpmClientContext';

export const ProjectFiles = () => {
  const startPage = 0;
  const pageSize = 25;

  const gridRef = useRef<GridHandle>(null);

  const snackbarContext = useContext(SnackbarContext);
  const { project, setProject } = useProjectContext();
  const tpmClient = useTpmClient();

  const [filterDefs, setFilterDefs] = useState<FilterDefinition[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColumnDefinition<File>[]>([]);

  useEffect(() => {
    forkJoin({
      users: tpmClient.users().all()
    }).subscribe({
      next: (result) => {
        const users = result.users.items as User[];

        setColumnDefs([
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
        ]);

        setFilterDefs([
          FilterDefinition.uniqueToken('id', 'Id'),
          FilterDefinition.string('name', 'Name'),
          FilterDefinition.date('uploadTime', 'Upload date'),
          FilterDefinition.select('uploader', 'Uploader', users.map((user) => ({ value: user.id, label: `${user.firstName} ${user.lastName}` }))),
        ]);
      },
      error: (error) => snackbarContext.showError(error.message, error.response.data.message),
    });
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Project files</Typography>
      <Box pb={2} />
      <Grid<File>
        innerRef={gridRef}
        startPage={startPage}
        pageSize={pageSize}
        fetch={tpmClient.projects().withId(project.id).files().all}
        export={tpmClient.projects().withId(project.id).files().export}
        filters={filterDefs}
        columnDefinitions={columnDefs}
      />
      <Box pb={2} />
      <Button variant="contained" component={Link} to="create">Create</Button>
    </Box>
  );
}