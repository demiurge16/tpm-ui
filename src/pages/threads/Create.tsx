import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSnackbarContext } from "../../contexts/SnackbarContext";
import { useBreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { Box, Button, Paper, Typography } from "@mui/material";
import { CreateThread } from "../../client/types/project/Thread";
import { Form } from "react-final-form";
import { array, object, string } from "yup";
import { MultivalueStringField, TextField } from "../../components/form-controls/TextField";
import { EditorField } from "../../components/form-controls/EditorField";
import { useTpmClient } from "../../contexts/TpmClientContext";
import { useSubmitHandler } from "../../components/form/useSubmitHandler";
import { Thread } from "../../client/types/thread/Thread";
import { useValidator } from "../../components/form/useValidator";

export const Create = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { showSuccess } = useSnackbarContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();;

  if (!projectId) {
    throw new Error('Project ID is required');
  }

  const tpmClient = useTpmClient();

  const initialValues: CreateThread = {
    title: '',
    content: '',
    tags: []
  };

  useEffect(() => {
    setBreadcrumbs([
      {
        label: 'Projects',
        path: '/projects'
      },
      {
        label: 'Project',
        path: `/projects/${projectId}`
      },
      {
        label: 'Create Thread',
        path: `/projects/${projectId}/threads/create`
      }
    ]);
  }, [projectId, setBreadcrumbs]);

  const { handleSubmit, submitError } = useSubmitHandler<CreateThread, Thread>({
    handleSubmit: (values) => tpmClient.projects().withId(projectId).threads().create(values),
    successHandler: (thread) => {
      showSuccess('Success', 'Thread created successfully');
      window.location.href = `/projects/${projectId}/threads/${thread.id}`;
    },
  });

  const validator = useValidator(
    object({
      title: string().required('Title is required')
        .min(3, 'Title must be at least 3 characters long')
        .max(512, 'Title must be at most 512 characters long'),
      tags: array().of(string().required('Tag is required'))
        .min(1, 'At least one tag is required')
        .max(12, 'At most 12 tags are allowed'),
      // body: string().required('Body is required')
    })
  );

  return (
    <Box>
      <Typography variant="h4">Create Thread</Typography>
      <Box pb={2} />

      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={initialValues}
        validate={validator}
        render={({ handleSubmit, submitting, pristine, values, form }) => (
          <form onSubmit={(event) => event.preventDefault()}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6">Title & tags</Typography>
              <TextField name="title" label="Title" required/>
              <MultivalueStringField name="tags" label="Tags" />
            </Paper>
            <Box pb={2} />

            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6">Content</Typography>
              <EditorField name="content" label="Content" required />
            </Paper>
            <Box pb={2} />

            <Paper elevation={2} sx={{ p: 2 }}>
              <Box display="flex" justifyContent="flex-end">
                <Button type="button" disabled={submitting || pristine}
                  onClick={() => {
                    handleSubmit();
                    form.reset();
                  }}
                >
                  Submit
                </Button>
                <Button type="button" disabled={submitting || pristine} onClick={() => form.reset()}>
                  Reset
                </Button>
              </Box>
            </Paper>
          </form>
        )}
      />
    </Box>
  );
};
