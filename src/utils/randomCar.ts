import type { CarCreateRequest } from '../types/car'
import { HEX_BYTE_BASE, HEX_BYTE_MAX } from './constants'

const CAR_LINEUP: Record<string, readonly string[]> = {
  Tesla: ['Model S', 'Model 3', 'Model X', 'Model Y', 'Roadster', 'Cybertruck'],
  Ford: ['Mustang', 'F-150', 'Focus', 'Fiesta', 'Explorer', 'Bronco', 'Ranger'],
  BMW: ['X5', 'X3', 'M3', 'M5', 'i8', '320i', '530i'],
  Audi: ['A4', 'A6', 'Q7', 'R8', 'RS6', 'TT', 'Q5'],
  Toyota: ['Camry', 'Corolla', 'RAV4', 'Supra', 'Prius', 'Yaris', 'Hilux'],
  Honda: ['Civic', 'Accord', 'CR-V', 'Type R', 'Pilot', 'Fit', 'HR-V'],
  Mercedes: ['C-Class', 'E-Class', 'S-Class', 'GLC', 'AMG GT', 'G-Wagon'],
  Chevy: ['Camaro', 'Corvette', 'Silverado', 'Tahoe', 'Malibu', 'Impala'],
  Nissan: [
    'Altima',
    'GT-R',
    'Skyline',
    '370Z',
    'Sentra',
    'Maxima',
    'Pathfinder',
  ],
  Mazda: ['CX-5', 'MX-5', 'RX-7', 'RX-8', 'CX-3', 'Mazda3', 'Mazda6'],
}

const CAR_BRANDS = Object.keys(CAR_LINEUP)

function pickRandom<T>(list: readonly T[]): T {
  return list[Math.floor(Math.random() * list.length)] as T
}

function randomHexByte(): string {
  const value = Math.floor(Math.random() * HEX_BYTE_MAX)
  return value.toString(HEX_BYTE_BASE).padStart(2, '0')
}

export function generateRandomCarName(): string {
  const brand = pickRandom(CAR_BRANDS)
  const model = pickRandom(CAR_LINEUP[brand] ?? [])
  return `${brand} ${model}`
}

export function generateRandomColor(): string {
  return `#${randomHexByte()}${randomHexByte()}${randomHexByte()}`
}

export function generateRandomCars(count: number): CarCreateRequest[] {
  return Array.from({ length: count }, () => ({
    name: generateRandomCarName(),
    color: generateRandomColor(),
  }))
}
