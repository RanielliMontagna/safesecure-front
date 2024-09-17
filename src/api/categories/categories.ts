import type { BackendResponse } from '@/constants/types'

import type {
  CreateCategoryPayload,
  FetchCategoriesParams,
  ResponseCategory,
} from './categories.types'

import { axiosInstance } from '@/lib/axios'
import { urls } from '../urls'

export async function fetchCategories(
  params?: FetchCategoriesParams,
): BackendResponse<{
  categories: ResponseCategory[] | null
}> {
  return await axiosInstance.get(urls.categories, { params })
}

export async function getCategory(id: string) {
  return await axiosInstance.get(`${urls.categories}/${id}`)
}

export async function createCategory(payload: CreateCategoryPayload) {
  return await axiosInstance.post(urls.categories, payload)
}

export async function updateCategory(
  id: string,
  payload: CreateCategoryPayload,
) {
  return await axiosInstance.put(`${urls.categories}/${id}`, payload)
}

export async function deleteCategory(id: string) {
  return await axiosInstance.delete(`${urls.categories}/${id}`)
}
