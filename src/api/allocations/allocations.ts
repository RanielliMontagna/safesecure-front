import type { BackendResponse } from '@/constants/types'

import type {
  CreateAllocationPayload,
  ResponseAllocation,
} from './allocations.types'

import { axiosInstance } from '@/lib/axios'
import { urls } from '../urls'

export async function fetchAllocations(): BackendResponse<{
  allocations: ResponseAllocation[]
}> {
  return await axiosInstance.get(urls.allocations)
}

export async function getAllocation(allocationId: string) {
  return await axiosInstance.get(`${urls.allocations}/${allocationId}`)
}

export async function createAllocation(payload: CreateAllocationPayload) {
  return await axiosInstance.post(urls.allocations, payload)
}

export async function returnAllocation(allocationId: string) {
  return await axiosInstance.patch(`${urls.allocations}/${allocationId}/return`)
}
