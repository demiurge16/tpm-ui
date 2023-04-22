export interface CreateIndustry {
  name: string,
  description: string,
}

export interface UpdateIndustry {
  name: string,
  description: string,
}

export interface Industry {
  id: string,
  name: string,
  description: string,
  active: boolean
}

export interface IndustryStatus {
  id: string,
  active: boolean
}
