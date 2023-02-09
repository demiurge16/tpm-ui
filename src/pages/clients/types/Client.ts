import { ClientType } from "../../dictionaries/client/types/ClientType"
import { Country } from "../../dictionaries/common/types/Country"

export interface Client {
  id: string,
  name: string,
  email: string,
  phone: string,
  address: string,
  city: string,
  state: string,
  zip: string,
  country: Country,
  vat: string,
  notes: string,
  type: ClientType,
  active: boolean,
}
