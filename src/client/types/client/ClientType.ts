export interface CreateClientType {
  name: string,
  description: string,
  corporate: boolean
}

export interface UpdateClientType {
  name: string,
  description: string,
  corporate: boolean
}

export interface ClientType {
  id: string,
  name: string,
  description: string,
  corporate: boolean,
  active: boolean
}

export interface ClientTypeStatus {
  id: string,
  active: boolean
}
