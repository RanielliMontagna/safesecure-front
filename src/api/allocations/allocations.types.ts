import type { Options } from '@/constants/types'

interface Equipment {
  id: string
  name: string
}

interface Employee {
  id: string
  name: string
}

export enum AllocationStatus {
  ALLOCATED,
  RETURNED,
  OVERDUE,
}

export interface CreateAllocationPayload {
  employeeId: string
  equipmentId: string
  startDate: Date
  endDate?: Date
  allocatedQuantity: number
}

export interface ResponseAllocation {
  id: string
  equipment: Equipment
  employee: Employee
  startDate: Date
  endDate?: Date
  allocatedQuantity: number
  status: AllocationStatus
}

export interface ResponseQuantityAllocationByWeek {
  day: string
  allocatedQuantity: string
}

export interface FetchAllocationsParams extends Options {}

export interface ResponseDashboardInfo {
  activeAllocations: number
  lateAllocations: number
  equipments: number
  employees: number
}
