import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbarContext } from "../../contexts/SnackbarContext";
import { useBreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { applicationClient } from "../../client/ApplicationClient";
import { Thread, UpdateThread } from "../../client/types/thread/Thread";
import { array, object, string } from "yup";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LoadingScreen } from "../utils/LoadingScreen";
import { Form } from "react-final-form";
import { MultivalueStringField, TextField } from "../../components/form-controls/TextField";
import { EditorField } from "../../components/form-controls/EditorField";
import { useSubmitHandler } from "../../components/form/useSubmitHandler";
import { useValidator } from "../../components/form/useValidator";

const Edit = () => {
  const { id } = useParams<{ id: string }>();
  const { showSuccess, showError } = useSnackbarContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();
  const navigate = useNavigate();

  if (!id) {
    throw new Error('Thread ID is required');
  }

  const [thread, setThread] = useState<Thread>({} as Thread);
  const [initialValues, setInitialValues] = useState<UpdateThread>({
    title: "",
    content: "",
    tags: []
  });

  useEffect(() => {
    if (!id) {
      return;
    }

    applicationClient.threads()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setThread(response);
          setInitialValues({
            title: response.title,
            content: response.content,
            tags: response.tags.map((tag) => tag.name)
          });

          setBreadcrumbs([
            { label: 'Threads', path: '/threads' },
            { label: response.title, path: `/threads/${id}` },
            { label: 'Edit', path: `/threads/${id}/edit` }
          ]);
        },
        error: (error) => showError(error.message, error.response.data.message)
      });
  }, [id, setBreadcrumbs, showError, applicationClient]);

  const { handleSubmit, submitError } = useSubmitHandler<UpdateThread, Thread>({
    handleSubmit: (values) => applicationClient.threads().withId(id).update(values),
    successHandler: (thread) => {
      showSuccess('Success', 'Thread updated successfully');
      navigate(`/threads/${thread.id}`);
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

  return thread.title ? (
    <Box>
      <Typography variant="h4">Edit {thread.title}</Typography>
      <Box pb={2} />

      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={initialValues}
        validate={validator}
        render={({ handleSubmit, submitting, pristine, form }) => (
          <form onSubmit={(event) => event.preventDefault()}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6">Title & tags</Typography>
              <TextField name="title" label="Title" required/>
              <MultivalueStringField name="tags" label="Tags" />
            </Paper>
            <Box pb={2} />

            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6">Content</Typography>
              <EditorField name="content" required />
            </Paper>
            <Box pb={2} />

            {submitError && (
              <>
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography color="error">Error: {submitError}</Typography>
                </Paper>
                <Box pb={2} />
              </>
            )}

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
  ) : (
    <Paper elevation={2} sx={{ p: 2 }}>
      <LoadingScreen />
    </Paper>
  );
};

export default Edit;
