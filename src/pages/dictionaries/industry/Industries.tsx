import { Index as IndexPage } from './Index';
import { Details as DetailsPage } from './Details';
import { Create as CreatePage } from './Create';
import { Edit as EditPage } from './Edit';

export namespace Industries {
  export const path = '/industries';
  export const title = 'Industries';
  export const description = 'Here you can manage define and manage industries. Industries are used to categorize projects and tasks based on their subject matter';
  export const Index = IndexPage;
  export const Details = DetailsPage;
  export const Create = CreatePage;
  export const Edit = EditPage;
}
