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
