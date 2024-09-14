import type { BackendResponse } from '@/constants/types'

import type {
  CreateEquipmentPayload,
  ResponseEquipment,
} from './equipments.types'

import { axiosInstance } from '@/lib/axios'
import { urls } from '../urls'

export async function fetchEquipments(): BackendResponse<{
  equipments: ResponseEquipment[]
}> {
  return await axiosInstance.get(urls.equipments)
}

export async function getEquipment(id: string) {
  return await axiosInstance.get(`${urls.equipments}/${id}`)
}

export async function createEquipment(payload: CreateEquipmentPayload) {
  return await axiosInstance.post(urls.equipments, payload)
}

export async function updateEquipment(
  id: string,
  payload: CreateEquipmentPayload,
) {
  return await axiosInstance.put(`${urls.equipments}/${id}`, payload)
}

export async function deleteEquipment(id: string) {
  return await axiosInstance.delete(`${urls.equipments}/${id}`)
}
