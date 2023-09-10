import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SnackbarContext } from "../../contexts/SnackbarContext";
import { BreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { useTpmClient } from "../../contexts/TpmClientContext";
import { Thread, UpdateThread } from "../../client/types/thread/Thread";
import { array, object, string } from "yup";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LoadingScreen } from "../utils/LoadingScreen";
import { Form } from "react-final-form";
import { validateWithSchema } from "../../utils/validate";
import { MultivalueStringField, TextField } from "../../components/form-controls/TextField";
import { EditorField } from "../../components/form-controls/EditorField";

export const Edit = () => {
  const { id } = useParams<{ id: string }>();
  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);
  const tpmClient = useTpmClient();
  const navigate = useNavigate();

  const [thread, setThread] = useState<Thread>({} as Thread);
  const [initialValues, setInitialValues] = useState<UpdateThread>({
    title: "",
    content: "",
    tags: []
  });

  const validationSchema = object({
    title: string().required('Title is required')
      .min(3, 'Title must be at least 3 characters long')
      .max(512, 'Title must be at most 512 characters long'),
    tags: array().of(string().required('Tag is required'))
      .min(1, 'At least one tag is required')
      .max(12, 'At most 12 tags are allowed'),
    // body: string().required('Body is required')
  });

  useEffect(() => {
    if (!id) {
      return;
    }

    tpmClient.threads()
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

          breadcrumbsContext.setBreadcrumbs([
            { label: 'Threads', path: '/threads' },
            { label: response.title, path: `/threads/${id}` },
            { label: 'Edit', path: `/threads/${id}/edit` }
          ]);
        },
        error: (error) => snackbarContext.showError(error.message, error.response.data.message)
      });
  }, []);

  const handleSubmit = (thread: UpdateThread) => {
    if (!id) {
      return;
    }

    tpmClient.threads()
      .withId(id)
      .update(thread)
      .subscribe({
        next: (response) => {
          snackbarContext.showSuccess('Success', 'Note updated');
          navigate(`/threads/${id}`);
        },
        error: (error) => snackbarContext.showError(error.message, error.response.data.message)
      });
  };

  return thread.title ? (
    <Box>
      <Typography variant="h4">Edit {thread.title}</Typography>
      <Box pb={2} />

      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={initialValues}
        validate={(values) => validateWithSchema(validationSchema, values)}
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
  ) : (
    <Paper elevation={2} sx={{ p: 2 }}>
      <LoadingScreen />
    </Paper>
  );
};
