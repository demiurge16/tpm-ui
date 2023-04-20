import { Index as IndexPage } from './Index';
import { Details as DetailsPage } from './Details';
import { Create as CreatePage } from './Create';
import { Edit as EditPage } from './Edit';

export namespace Units {
  export const path = '/units';
  export const title = 'Translation Units';
  export const description = 'Here you can define a translation unit. This will help you measure the volume of your tasks an projects. For example, a translation unit can be a word, a sentence, a paragraph, a page, a chapter, a book, etc.';
  export const Index = IndexPage;
  export const Details = DetailsPage;
  export const Create = CreatePage;
  export const Edit = EditPage;
}
