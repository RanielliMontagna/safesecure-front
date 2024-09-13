export interface CreateCategoryPayload {
  name: string
  description?: string
}

export interface ResponseCategory extends CreateCategoryPayload {
  id: string
}
