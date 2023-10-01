import { Country } from "../dictionaries/Country"

export interface CreateClient {
  name: string,
  email: string,
  phone: string,
  address: string,
  city: string,
  state: string,
  zip: string,
  countryCode: string,
  vat: string,
  notes: string,
  clientTypeId: string
}

export interface UpdateClient {
  name: string,
  email: string,
  phone: string,
  address: string,
  city: string,
  state: string,
  zip: string,
  countryCode: string,
  vat: string,
  notes: string,
  clientTypeId: string
}

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

export interface ClientType {
  id: string,
  name: string,
  description: string,
  corporate: boolean,
}

export interface ClientStatus {
  id: string,
  active: boolean
}
