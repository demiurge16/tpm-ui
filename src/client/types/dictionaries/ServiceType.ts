export interface CreateServiceType {
  name: string,
  description: string,
}

export interface UpdateServiceType {
  name: string,
  description: string,
}

export interface ServiceType {
  id: string,
  name: string,
  description: string,
  active: boolean
}

export interface ServiceTypeStatus {
  id: string,
  active: boolean
}
