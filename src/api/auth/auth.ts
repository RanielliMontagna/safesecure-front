import { urls } from '@/api/urls'
import { axiosPublicInstance } from '@/lib/axios'

import type { LoginPayload } from './auth.types'

export async function login(payload: LoginPayload) {
  return await axiosPublicInstance.post(urls.login, payload)
}
