import { ValidationErrors } from "final-form";
import { ObjectSchema } from "yup";

export const validateWithSchema = (validationSchema: ObjectSchema<any>, values: any): ValidationErrors => {
  try {
    validationSchema.validateSync(values, { abortEarly: false });
  } catch (error: any) {
    return error.inner.reduce((errors: any, error: any) => {
      return {
        ...errors,
        [error.path]: error.message
      };
    }, {});
  }
};
