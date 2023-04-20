import { Index as IndexPage } from './Index';
import { Details as DetailsPage } from './Details';

export namespace Languages {
  export const path = '/languages';
  export const title = 'Languages';
  export const description = 'Here you can see a list of all languages and their data.';
  export const Index = IndexPage;
  export const Details = DetailsPage;
}
