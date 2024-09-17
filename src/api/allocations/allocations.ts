import type { BackendResponse } from '@/constants/types'

import type {
  CreateAllocationPayload,
  FetchAllocationsParams,
  ResponseAllocation,
} from './allocations.types'

import { axiosInstance } from '@/lib/axios'
import { urls } from '../urls'

export async function fetchAllocations(
  params?: FetchAllocationsParams,
): BackendResponse<{
  allocations: ResponseAllocation[] | null
}> {
  return await axiosInstance.get(urls.allocations, { params })
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
