import { Index as IndexPage } from './Index';
import { Details as DetailsPage } from './Details';
import { Create as CreatePage } from './Create';
import { Edit as EditPage } from './Edit';

export namespace Tasks {
  export const path = '/tasks';
  export const title = 'Tasks';
  export const description = 'This is the tasks page. There are all of the tasks that you have inflicted upon yourself.';
  export const Index = IndexPage;
  export const Details = DetailsPage;
  export const Create = CreatePage;
  export const Edit = EditPage;
}
