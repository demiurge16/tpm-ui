import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SnackbarContext } from "../../contexts/SnackbarContext";
import { BreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { Box, Button, Typography } from "@mui/material";
import { CreateThread } from "../../client/types/project/Thread";
import { Form } from "react-final-form";
import TpmClient from "../../client/TpmClient";
import { array, object, string } from "yup";
import { validateWithSchema } from "../../utils/validate";
import { MultivalueStringField, TextField } from "../../components/form-controls/TextField";
import { EditorField } from "../../components/form-controls/EditorField";

export const Create = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  const initialValues: CreateThread = {
    title: '',
    content: '',
    tags: []
  };

  useEffect(() => {
    breadcrumbsContext.setBreadcrumbs([
      {
        label: 'Projects',
        path: '/projects'
      },
      {
        label: 'Project',
        path: `/projects/${projectId}`
      },
      {
        label: 'Create Note',
        path: `/projects/${projectId}/notes/create`
      }
    ]);
  }, []);

  const handleSubmit = (thread: CreateThread) => {
    if (!projectId) {
      return;
    }

    TpmClient.getInstance()
      .projects()
      .withId(projectId)
      .threads()
      .create(thread)
      .subscribe({
        next: (response) => {
          snackbarContext.showSuccess('Success', 'Note added');
        },
        error: (error) => snackbarContext.showError(error.message, error.response.data.message)
      });
  };

  const validationSchema = object({
    title: string().required('Title is required')
      .min(3, 'Title must be at least 3 characters long')
      .max(512, 'Title must be at most 512 characters long'),
    tags: array().of(string().required('Tag is required'))
      .min(1, 'At least one tag is required')
      .max(12, 'At most 12 tags are allowed'),
    // body: string().required('Body is required')
  });

  return (
    <Box>
      <Typography variant="h4">Create Thread</Typography>
      <Box pb={2} />

      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={initialValues}
        validate={(values) => validateWithSchema(validationSchema, values)}
        render={({ handleSubmit, submitting, pristine, values, form }) => (
          <form onSubmit={(event) => event.preventDefault()}>
            <TextField name="title" label="Title" required/>
            <MultivalueStringField name="tags" label="Tags" />
            <EditorField name="content" label="Content" required />

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
          </form>
        )}
      />
    </Box>
  );
};
