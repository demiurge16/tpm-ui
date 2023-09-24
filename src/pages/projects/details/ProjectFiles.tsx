import { useRef, useState, useEffect } from 'react';
import { GridHandle } from '../../../components/grid/GridProps';
import { useSnackbarContext } from '../../../contexts/SnackbarContext';
import { useProjectContext } from './context/ProjectContext';
import { FilterDefinition } from '../../../components/grid/FilterDefinition';
import { Box, Button, Grid as MuiGrid, Paper, Typography } from '@mui/material';
import { Grid } from '../../../components/grid/Grid';
import { File as FileDescriptor } from '../../../client/types/file/File';
import { Link } from 'react-router-dom';
import { User } from '../../../client/types/user/User';
import { forkJoin } from 'rxjs';
import { useTpmClient } from '../../../contexts/TpmClientContext';
import { GridConfig } from '../../../components/grid/GridConfig';
import { LoadingScreen } from '../../utils/LoadingScreen';
import { Form } from 'react-final-form';
import { FilePickerField } from '../../../components/form-controls/FilePickerField';

export const ProjectFiles = () => {
  const gridRef = useRef<GridHandle>(null);

  const [gridConfig, setGridConfig] = useState<GridConfig<FileDescriptor>>({
    page: 0,
    pageSize: 25,
    columnDefs: [],
    filters: []
  });
  const [loading, setLoading] = useState<boolean>(true);

  const { showSuccess, showError } = useSnackbarContext();
  const { project } = useProjectContext();
  const tpmClient = useTpmClient();

  const handleUpload = (values: any) => {
    const formData = new FormData();
    Array.from(values.file).forEach((file) => {
      formData.append('file', file as File);
    });

    tpmClient.projects().withId(project.id).files().create(formData).subscribe({
      next: () => {
        gridRef.current?.refresh();
        showSuccess('Files uploaded successfully', '');
      },
      error: (error) => showError(error.message, error.response.data.message)
    });
  };



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
                  const file = params.data as FileDescriptor;
                  return `${file.uploader.firstName} ${file.uploader.lastName}`;
                }
              },
              {
                headerName: 'Actions',
                field: 'actions',
                resizable: true,
                lockVisible: true,
                cellRenderer: (params: any) => {
                  const file = params.data as FileDescriptor;
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
      error: (error) => showError(error.message, error.response.data.message),
    });
  }, [showError, tpmClient]);

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
            <Grid<FileDescriptor>
              innerRef={gridRef}
              startPage={gridConfig.page}
              pageSize={gridConfig.pageSize}
              fetch={tpmClient.projects().withId(project.id).files().all}
              exportData={tpmClient.projects().withId(project.id).files().export}
              filters={gridConfig.filters}
              columnDefinitions={gridConfig.columnDefs}
              elevation={2}
            />
            <Box pb={2} />
            <Paper elevation={2} sx={{ p: 2 }}>
              <Form onSubmit={handleUpload}>
                {({ handleSubmit, form, submitting, pristine }) => (
                  <form onSubmit={handleSubmit} noValidate>
                    <MuiGrid container spacing={2}>
                      <MuiGrid item xs={10}>
                        <FilePickerField name="file" label="File" required />
                      </MuiGrid>
                      <MuiGrid item xs={2}>
                        <Button type="submit" variant="contained" size='large' fullWidth disabled={submitting || pristine}>Upload</Button>
                      </MuiGrid>
                    </MuiGrid>
                  </form>
                )}
              </Form>
            </Paper>
          </>
        )
      }
    </Box>
  );
}