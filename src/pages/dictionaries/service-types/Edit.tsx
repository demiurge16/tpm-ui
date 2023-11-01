import { useNavigate, useParams } from "react-router-dom";
import { useBreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { TextField } from "../../../components/form-controls/TextField";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { UpdateServiceType } from "../../../client/types/dictionaries/ServiceType";
import { applicationClient } from "../../../client/ApplicationClient";
import { LoadingScreen } from "../../utils/LoadingScreen";
import { useServiceType } from "./hooks/useServiceType";
import { useSubmitHandler } from "../../../components/form/useSubmitHandler";
import { ServiceType } from "../../../client/types/project/Project";
import { useValidator } from "../../../components/form/useValidator";
import { object, string } from "yup";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  if (!id) {
    throw new Error('No id provided');
  }

  const { setBreadcrumbs } = useBreadcrumbsContext();
  const { showSuccess } = useSnackbarContext();

  const { loading, loadingError, serviceType } =
    useServiceType(id, (serviceType) => {
      setBreadcrumbs([
        { label: "Service types", path: "/service-types" },
        { label: serviceType.name, path: `/service-types/${serviceType.id}` },
        { label: "Edit", path: `/service-types/${serviceType.id}/edit` }
      ]);
    });

  const { handleSubmit, submitError } = useSubmitHandler<UpdateServiceType, ServiceType>({
    handleSubmit: (values) => applicationClient.serviceTypes().withId(id).update(values),
    successHandler: () => {
      showSuccess("Success", "Service type updated successfully");
      navigate(`/service-types/${id}`);
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

  if (loading) {
    return (
      <Paper elevation={2} sx={{ p: 2 }}>
        <LoadingScreen />
      </Paper>
    );
  }

  if (loadingError) {
    return (
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>Error loading service type {id}</Typography>
        <Typography variant="body1" gutterBottom>{loadingError}</Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Typography variant="h4">Edit {serviceType.name}</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={{
          name: serviceType.name,
          description: serviceType.description
        }}
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

export default Edit;
