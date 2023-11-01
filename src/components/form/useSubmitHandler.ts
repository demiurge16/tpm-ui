import { useState } from "react";
import { Observable, firstValueFrom } from "rxjs";
import { useSnackbarContext } from "../../contexts/SnackbarContext";
import { SubmissionErrors } from "final-form";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation("translation", { keyPrefix: "errors" });
  const { showError } = useSnackbarContext();

  const handleSubmit = async (values: SubmitPayload) => {
    try {
      const result = await firstValueFrom(config.handleSubmit(values));
      config.successHandler(result);
    } catch (error: any) {
      switch (error.response.status) {
        case 400: {
          const errors = error.response.data as {
            message: string;
            errors: [{ field: string; message: string }];
          };
  
          const formErrors: SubmissionErrors = {};
  
          errors.errors.forEach((e) => {
            formErrors[e.field] = e.message;
          });
  
          showError(t("error"), errors.message);
          setSubmitError(errors.message);
          return formErrors;
        }
        case 401:
          showError(t("error"), t("unauthorized"));
          setSubmitError(t("unauthorizedDescription"));
          break;
        case 403:
          showError(t("error"), t("forbidden"));
          setSubmitError(t("forbiddenDescription"));
          break;
        case 500:
          showError(t("error"), error.response.data.message);
          setSubmitError(`${t('internalServerError')}: ${error.response.data.message}`);
          break;
        default:
          showError(t("error"), error.message);
          setSubmitError(error.message);
      }
    }
  }

  return { handleSubmit, submitError };
}
