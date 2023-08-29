import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SnackbarContext } from "../../contexts/SnackbarContext";
import { BreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { Box, Button, Typography } from "@mui/material";
import { CreateThread } from "../../client/types/project/Thread";
import { Form } from "react-final-form";
import TpmClient from "../../client/TpmClient";
import { object, string } from "yup";
import { validateWithSchema } from "../../utils/validate";
import { TextField } from "../../components/form-controls/TextField";
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
          <form onSubmit={handleSubmit}>
            <TextField name="title" label="Title" required/>
            <EditorField name="content" label="Content" required />

            <Button type="submit" disabled={submitting || pristine}>
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
