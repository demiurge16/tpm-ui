import { Index as IndexPage } from './Index';
import { Details as DetailsPage } from './Details';

export namespace Currencies {
  export const path = '/currencies';
  export const title = 'Currencies';
  export const description = 'Here you can see a list of all currencies and their exchange rates.';
  export const Index = IndexPage;
  export const Details = DetailsPage;
}
