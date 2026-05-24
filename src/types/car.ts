export interface Car {
  id: number
  name: string
  color: string
}

export type CarCreateRequest = Omit<Car, 'id'>

export type CarUpdateRequest = CarCreateRequest
