import { Index as IndexPage } from './Index';
import { Details as DetailsPage } from './Details';
import { Create as CreatePage } from './Create';
import { Edit as EditPage } from './Edit';

export namespace ServiceTypes {
  export const path = '/service-types';
  export const title = 'Service types';
  export const description = 'Here you can define and manage service types';
  export const Index = IndexPage;
  export const Details = DetailsPage;
  export const Create = CreatePage;
  export const Edit = EditPage;
}
