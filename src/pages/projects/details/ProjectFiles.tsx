import { useRef, useState, useEffect } from 'react';
import { GridHandle } from '../../../components/grid/GridProps';
import { useSnackbarContext } from '../../../contexts/SnackbarContext';
import { useProjectContext } from './context/ProjectContext';
import { FilterDefinition } from '../../../components/grid/FilterDefinition';
import { Box, Button, Grid as MuiGrid, Paper, Typography } from '@mui/material';
import { Grid } from '../../../components/grid/Grid';
import { File as FileDescriptor } from '../../../client/types/file/File';
import { User } from '../../../client/types/user/User';
import { forkJoin } from 'rxjs';
import { GridConfig } from '../../../components/grid/GridConfig';
import { LoadingScreen } from '../../utils/LoadingScreen';
import { Form } from 'react-final-form';
import { FilePickerField } from '../../../components/form-controls/FilePickerField';
import { applicationClient } from '../../../client/ApplicationClient';

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

  const handleUpload = (values: any) => {
    const formData = new FormData();
    Array.from(values.file).forEach((file) => {
      formData.append('file', file as File);
    });

    applicationClient.projects().withId(project.id).files().create(formData).subscribe({
      next: () => {
        gridRef.current?.refresh();
        showSuccess('Files uploaded successfully', '');
      },
      error: (error) => showError(error.message, error.response.data.message)
    });
  };

  useEffect(() => {
    forkJoin({
      users: applicationClient.users().all()
    }).subscribe({
      next: (result) => {
        const users = result.users.items as User[];

        setGridConfig(() => {
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
                  const handleDownload = () => {
                    applicationClient.files().withId(file.id).download().subscribe({
                      next: (data) => {
                        const blob = new Blob([data as any], { type: 'text/csv' });
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
              
                        a.setAttribute('hidden', '');
                        a.setAttribute('href', url);
                        a.setAttribute('download', file.name);
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                      },
                      error: (error) => showError(error.message, error.response.data.message)
                    });
                  }

                  return (
                    <Box>
                      <Button variant="text" onClick={handleDownload}>
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
  }, [showError, applicationClient]);

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
              fetch={applicationClient.projects().withId(project.id).files().all}
              exportData={applicationClient.projects().withId(project.id).files().export}
              filters={gridConfig.filters}
              columnDefinitions={gridConfig.columnDefs}
              elevation={2}
            />
            <Box pb={2} />
            <Paper elevation={2} sx={{ p: 2 }}>
              <Form onSubmit={handleUpload}>
                {({ handleSubmit, submitting, pristine }) => (
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