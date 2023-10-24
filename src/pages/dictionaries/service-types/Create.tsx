import { Box, Button, Paper, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { TextField } from "../../../components/form-controls/TextField";
import { useBreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { object, string } from "yup";
import { CreateServiceType, ServiceType } from "../../../client/types/dictionaries/ServiceType";
import { applicationClient } from "../../../client/ApplicationClient";
import { useSubmitHandler } from "../../../components/form/useSubmitHandler";
import { useValidator } from "../../../components/form/useValidator";
import { useRefdata } from "../../../components/form/useRefdata";

export const Create = () => {
  const navigate = useNavigate();

  const { showSuccess } = useSnackbarContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();

  useRefdata(
    {},
    () => setBreadcrumbs([
      { label: "Service types", path: "/service-types" },
      { label: "Create", path: "/service-types/create" },
    ])
  );

  const { handleSubmit, submitError } = useSubmitHandler<CreateServiceType, ServiceType>({
    handleSubmit: (values) => applicationClient.serviceTypes().create(values),
    successHandler: (serviceType) => {
      showSuccess("Success", "Service type created successfully");
      navigate(`/service-types/${serviceType.id}`);
    },
  });

  const validator = useValidator(
    object({
      name: string().required("Name is required")
        .min(3, "Name must be at least 3 characters long")
        .max(50, "Name must be at most 50 characters long"),
      description: string().required("Description is required")
        .min(3, "Description must be at least 3 characters long")
        .max(1000, "Description must be at most 1000 characters long")
    })
  );

  return (
    <Box>
      <Typography variant="h4">Create new priority</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={{ name: '', description: '', value: 0, emoji: '' }}
        validate={validator}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate> 
            <Paper elevation={2} sx={{ p: 2 }}>
              <TextField name="name" label="Name" required />
              <TextField name="description" label="Description" multiline rows={4} required />
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
                <Button type="submit" disabled={submitting || pristine}>
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
