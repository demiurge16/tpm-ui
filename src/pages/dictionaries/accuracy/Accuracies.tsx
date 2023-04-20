import { Index as IndexPage } from './Index';
import { Details as DetailsPage } from './Details';
import { Create as CreatePage } from './Create';
import { Edit as EditPage } from './Edit';

export namespace Accuracies {
  export const path = '/accuracies';
  export const title = 'Accuracies';
  export const description = 'Here you can define a translation accuracy. Accuracies are used to tell the translator how accurate the translation should be';
  export const Index = IndexPage;
  export const Details = DetailsPage;
  export const Create = CreatePage;
  export const Edit = EditPage;
}

