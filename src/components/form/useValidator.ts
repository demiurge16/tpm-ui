import { ValidationErrors } from "final-form";
import { ObjectSchema } from "yup";

type Validator = (values: any) => ValidationErrors;

export function useValidator(validationSchema: ObjectSchema<any>): Validator {
  return (values: any) => {
    try {
      validationSchema.validateSync(values, { abortEarly: false });
      return {};
    } catch (error: any) {
      return error.inner.reduce((errors: any, error: any) => {
        return {
          ...errors,
          [error.path]: error.message
        };
      }, {});
    }
  };
}
