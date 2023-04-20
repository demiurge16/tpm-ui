import { Index as IndexPage } from './Index';
import { Details as DetailsPage } from './Details';
import { Create as CreatePage } from './Create';
import { Edit as EditPage } from './Edit';

export namespace Expenses {
  export const path = '/expenses';
  export const title = 'Expenses';
  export const description = 'This is the expenses page. It contains a list of expenses that happened while working on a projects.';
  export const Index = IndexPage;
  export const Details = DetailsPage;
  export const Create = CreatePage;
  export const Edit = EditPage;
}
