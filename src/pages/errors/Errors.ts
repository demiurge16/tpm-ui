import { Forbidden as ForbiddenPage } from './Forbidden';
import { NotFound as NotFoundPage } from './NotFound';
import { InternalServerError as InternalServerErrorPage } from './InternalServerError';

export namespace Errors {
  export const Forbidden = ForbiddenPage;
  export const NotFound = NotFoundPage;
  export const InternalServerError = InternalServerErrorPage;
}
