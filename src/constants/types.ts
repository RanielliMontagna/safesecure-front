import { AxiosResponse } from 'axios'

interface AxiosResponseWithMeta<T> extends AxiosResponse<T> {}

export type BackendResponse<T> = Promise<AxiosResponseWithMeta<T>>

export interface Options {
  search?: string
}
