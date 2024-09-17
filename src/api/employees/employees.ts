import type { BackendResponse } from '@/constants/types'

import type {
  CreateEmployeePayload,
  FetchEmployeesParams,
  ResponseEmployee,
} from './employees.types'

import { axiosInstance } from '@/lib/axios'
import { urls } from '../urls'

export async function fetchEmployees(
  params?: FetchEmployeesParams,
): BackendResponse<{
  employees: ResponseEmployee[] | null
}> {
  return await axiosInstance.get(urls.employees, { params })
}

export async function getEmployee(id: string) {
  return await axiosInstance.get(`${urls.employees}/${id}`)
}

export async function createEmployee(payload: CreateEmployeePayload) {
  return await axiosInstance.post(urls.employees, payload)
}

export async function updateEmployee(
  id: string,
  payload: CreateEmployeePayload,
) {
  return await axiosInstance.put(`${urls.employees}/${id}`, payload)
}

export async function deleteEmployee(id: string) {
  return await axiosInstance.delete(`${urls.employees}/${id}`)
}
