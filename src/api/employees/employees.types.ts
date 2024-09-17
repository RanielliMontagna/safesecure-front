import type { Options } from '@/constants/types'

export interface CreateEmployeePayload {
  name: string
  cpf: string
  registration: number
  sector: string
}

export interface ResponseEmployee extends CreateEmployeePayload {
  id: string
}

export interface FetchEmployeesParams extends Options {}
