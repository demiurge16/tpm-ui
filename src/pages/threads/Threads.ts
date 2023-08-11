import { Index as IndexPage } from './Index';
import { Details as DetailsPage } from './Details';
import { Create as CreatePage } from './Create';
import { Edit as EditPage } from './Edit';

export namespace Threads {
  export const path = '/threads';
  export const title = 'Threads';
  export const description = 'This is the threads page. There are all the threads from all the projects.';
  export const Index = IndexPage;
  export const Details = DetailsPage;
  export const Create = CreatePage;
  export const Edit = EditPage;
}
