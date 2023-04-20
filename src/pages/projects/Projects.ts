import { Index as IndexPage } from './Index';
import { Details as DetailsPage } from './Details';
import { Create as CreatePage } from './Create';
import { Edit as EditPage } from './Edit';

export namespace Projects {
  export const path = '/projects';
  export const title = 'Projects';
  export const description = 'This is the heart of your business. Here you can see and manage all your projects.';
  export const Index = IndexPage;
  export const Details = DetailsPage;
  export const Create = CreatePage;
  export const Edit = EditPage;
}
