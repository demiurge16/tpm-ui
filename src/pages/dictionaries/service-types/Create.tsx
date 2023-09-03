import { useContext, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { TextField } from "../../../components/form-controls/TextField";
import { BreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { object, string } from "yup";
import { validateWithSchema } from "../../../utils/validate";
import { CreateServiceType } from "../../../client/types/dictionaries/ServiceType";
import { useTpmClient } from "../../../contexts/TpmClientContext";

export const Create = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  const breadcrumbsContext = useContext(BreadcrumbsContext);
  const snackbarContext = useContext(SnackbarContext);
  const tpmClient = useTpmClient();

  useEffect(() => {
    breadcrumbsContext.setBreadcrumbs([
      { label: "Service types", path: "/service-types" },
      { label: "Create", path: "/service-types/create" },
    ]);
  }, []);

  const handleSubmit = (data: CreateServiceType) => 
    tpmClient.serviceTypes()
      .create(data)
      .subscribe({
        next: () => {
          snackbarContext.showSuccess("Success", "Priority created");
          navigate("/service-types");
        },
        error: (error) => {
          snackbarContext.showError("Error creating priority", error.message);
          setServerError(error.message);
        }
      });

  const validationSchema = object({
    name: string().required("Name is required")
      .min(3, "Name must be at least 3 characters long")
      .max(50, "Name must be at most 50 characters long"),
    description: string().required("Description is required")
      .min(3, "Description must be at least 3 characters long")
      .max(1000, "Description must be at most 1000 characters long")
  });

  return (
    <Box>
      <Typography variant="h4">Create new priority</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={{ name: '', description: '', value: 0, emoji: '' }}
        validate={(values) => validateWithSchema(validationSchema, values)}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate> 
            <TextField name="name" label="Name" required />
            <TextField name="description" label="Description" multiline rows={4} required />

            <Box pb={2} />
            {serverError && (
              <Typography color="error">Error: {serverError}</Typography>
            )}
            <Box pb={2} />
            
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
