export interface CreatePriority {
  name: string,
  description: string,
  value: number,
  emoji: string
}

export interface UpdatePriority {
  name: string,
  description: string,
  value: number,
  emoji: string
}

export interface Priority {
  id: string,
  name: string,
  description: string,
  value: number,
  emoji: string,
  active: boolean
}

export interface PriorityStatus {
  id: string,
  active: boolean
}
