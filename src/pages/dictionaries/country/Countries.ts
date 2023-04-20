import { Index as IndexPage } from './Index';
import { Details as DetailsPage } from './Details';

export namespace Countries {
  export const path = '/countries';
  export const title = 'Countries';
  export const description = 'Here you can see a list of all countries and their data.';
  export const Index = IndexPage;
  export const Details = DetailsPage;
}
