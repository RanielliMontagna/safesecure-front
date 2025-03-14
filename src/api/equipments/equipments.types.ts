import type { Options } from '@/constants/types'

interface Category {
  id: string
  name: string
}

export interface CreateEquipmentPayload {
  code: number
  name: string
  categoryId: string
  quantity: number
}

export interface ResponseEquipment
  extends Omit<CreateEquipmentPayload, 'categoryId'> {
  id: string
  category: Category
  available_quantity: number
}

export interface FetchEquipmentsParams extends Options {}
