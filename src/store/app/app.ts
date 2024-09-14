import { create } from 'zustand'

import type { AppState, AppStore } from './types'
import { AxiosError } from 'axios'
import { toast } from '@/hooks'

const initialState: AppState = {
  loading: false,
}

export const useAppStore = create<AppStore>(set => ({
  ...initialState,
  setLoading: loading => set({ loading }),
  clearStore: () => set(initialState),
  handleError: (err: any) => {
    set({ loading: false })

    if (err?.name === 'AxiosError') {
      const axiosError = err as AxiosError<{
        message: string
        issues: Record<string, { _errors: string[] }>
      }>

      const issues = axiosError?.response?.data?.issues

      if (issues) {
        const firstIssue = Object.values(issues)[1]

        toast({
          title: axiosError?.response?.data?.message || 'Ocorreu um erro',
          description: firstIssue?._errors?.[0],
          variant: 'destructive',
        })
      } else if (err.message === 'Network Error') {
        toast({
          title: 'Ocorreu um erro',
          description: 'Verifique sua conexão com a internet',
          variant: 'destructive',
        })
      } else {
        const message = axiosError?.response?.data?.message

        toast({
          title: 'Ocorreu um erro inesperado',
          description: message || 'Tente novamente mais tarde',
          variant: 'destructive',
        })
      }
    } else if (typeof err === 'object' && err?.message) {
      toast({
        title: err.title || 'Ocorreu um erro',
        description: err.message,
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Ocorreu um erro inesperado',
        description: 'Tente novamente mais tarde',
        variant: 'destructive',
      })
    }
  },
}))
