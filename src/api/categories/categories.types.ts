import type { Options } from '@/constants/types'

export interface CreateCategoryPayload {
  name: string
  description?: string
}

export interface ResponseCategory extends CreateCategoryPayload {
  id: string
}

export interface FetchCategoriesParams extends Options {}
