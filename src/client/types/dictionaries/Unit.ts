export interface CreateUnit {
  name: string,
  description: string,
  value: number,
  measurement: MeasurementCode
}

export interface UpdateUnit {
  name: string,
  description: string,
  value: number,
  measurement: MeasurementCode
}

export type MeasurementCode = "CHARACTERS" | "POINTS" | "HOURS";

export interface Unit {
  id: string,
  name: string,
  description: string,
  value: number,
  measurement: Measurement,
  active: boolean
}

export interface Measurement {
  code: MeasurementCode,
  name: string,
  description: string
}

export interface UnitStatus {
  id: string,
  active: boolean
}
