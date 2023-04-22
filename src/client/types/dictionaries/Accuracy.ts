export interface CreateAccuracy {
  name: string,
  description: string,
}

export interface UpdateAccuracy {
  name: string,
  description: string,
}

export interface Accuracy {
  id: string,
  name: string,
  description: string,
  active: boolean
}

export interface AccuracyStatus {
  id: string,
  active: boolean
}

