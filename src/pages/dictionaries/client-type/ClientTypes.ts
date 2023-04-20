import { Index as IndexPage } from './Index';
import { Details as DetailsPage } from './Details';
import { Create as CreatePage } from './Create';
import { Edit as EditPage } from './Edit';

export namespace ClientTypes {
  export const path = '/client-types';
  export const title = 'Client Types';
  export const description = 'Here you can define a client type. For example, you can define a client type as "Individual" or "Company". Use this feature to categorize your clients.';
  export const Index = IndexPage;
  export const Details = DetailsPage;
  export const Create = CreatePage;
  export const Edit = EditPage;
}
