import type { LoginPayload } from '@/api/auth/auth.types'

export interface UserTokenDecoded {
  sub: string
  email: string
  name: string
}

export interface AuthState {
  token: string | null
  user: UserTokenDecoded | null
}

export interface AuthStore extends AuthState {
  login: (payload: LoginPayload) => Promise<void>
  setToken: (token: string) => void
  setUser: (user: UserTokenDecoded) => void
  clearStore: () => void
}
