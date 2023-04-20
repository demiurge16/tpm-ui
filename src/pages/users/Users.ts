import { Index as IndexPage } from './Index';
import { Details as DetailsPage } from './Details';

export namespace Users {
  export const path = '/users';
  export const title = 'Users';
  export const description = 'This is the users page. It contains a list of users of your application.';
  export const Index = IndexPage;
  export const Details = DetailsPage;
}
