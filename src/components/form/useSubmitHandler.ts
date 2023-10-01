import { useState } from "react";
import { Observable, firstValueFrom } from "rxjs";
import { useSnackbarContext } from "../../contexts/SnackbarContext";
import { SubmissionErrors } from "final-form";

export interface SubmitHandlerParams<SubmitPayload, SubmitResult> {
  handleSubmit: (values: SubmitPayload) => Observable<SubmitResult>;
  successHandler: (result: SubmitResult) => void;
}

export function useSubmitHandler<SubmitPayload, SubmitResult>(
  config: SubmitHandlerParams<SubmitPayload, SubmitResult>
): {
  handleSubmit: (values: SubmitPayload) => Promise<SubmissionErrors | undefined>;
  submitError: string | null;
} {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { showError } = useSnackbarContext();

  const handleSubmit = async (values: SubmitPayload) => {
    try {
      const result = await firstValueFrom(config.handleSubmit(values));
      config.successHandler(result);
    } catch (error: any) {
      switch (error.response.status) {
        case 400:
          const errors = error.response.data as {
            message: string;
            errors: [{ field: string; message: string }];
          };
  
          const formErrors: SubmissionErrors = {};
  
          errors.errors.forEach((e) => {
            formErrors[e.field] = e.message;
          });
  
          showError("Error", errors.message);
          setSubmitError(errors.message);
          return formErrors;
        case 401:
          showError("Error", "Unauthorized");
          setSubmitError("Unauthorized, please login again");
          break;
        case 403:
          showError("Error", "Forbidden");
          setSubmitError("You don't have permission to perform this action");
          break;
        case 500:
          showError("Error", error.response.data.message);
          setSubmitError(`Internal server error: ${error.response.data.message}`);
          break;
        default:
          showError("Error", error.message);
          setSubmitError(error.message);
      }
    }
  }

  return { handleSubmit, submitError };
}
