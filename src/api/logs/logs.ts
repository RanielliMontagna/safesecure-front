import { axiosInstance } from '@/lib/axios'

import type { BackendResponse } from '@/constants/types'
import type { ResponseLog } from './logs.types'

import { urls } from '../urls'

type FetchLogsResponse = BackendResponse<{ logs: ResponseLog[] }>

export async function fetchLogs(): Promise<FetchLogsResponse> {
  return await axiosInstance.get(urls.logs)
}
