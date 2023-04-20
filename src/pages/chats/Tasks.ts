import { Index as IndexPage } from './Index';
import { Details as DetailsPage } from './Details';
import { Create as CreatePage } from './Create';
import { Edit as EditPage } from './Edit';

export namespace Chats {
  export const path = '/chats';
  export const title = 'Chats';
  export const description = 'This is the chats page. It contains a list of chats you have with your colleagues.';
  export const Index = IndexPage;
  export const Details = DetailsPage;
  export const Create = CreatePage;
  export const Edit = EditPage;
}
