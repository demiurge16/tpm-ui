import { ClientType } from "../../dictionaries/client-type/types/ClientType"
import { Country } from "../../dictionaries/country/types/Country"

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
