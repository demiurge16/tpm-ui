import { Index as IndexPage } from './Index';
import { Details as DetailsPage } from './Details';
import { Create as CreatePage } from './Create';
import { Edit as EditPage } from './Edit';

export namespace ExpenseCategories {
  export const path = '/expense-categories';
  export const title = 'Expense Categories';
  export const description = 'Here you can manage define and manage expense categories for categorizing additional project costs';
  export const Index = IndexPage;
  export const Details = DetailsPage;
  export const Create = CreatePage;
  export const Edit = EditPage;
}
