import { Index as IndexPage } from './Index';
import { Create as CreatePage } from './Create';

export namespace Expenses {
  export const path = '/expenses';
  export const title = 'Expenses';
  export const description = 'This is the expenses page. It contains a list of expenses that happened while working on a projects.';
  export const Index = IndexPage;
  export const Create = CreatePage;
}
