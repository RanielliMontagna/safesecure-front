import { create } from 'zustand'

import type { AppState, AppStore } from './types'
import { AxiosError } from 'axios'

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
        // const firstIssue = Object.values(issues)[1]
        //TODO: Implement toast
        // notifications.show({
        //   title: axiosError?.response?.data?.message || 'Ocorreu um erro',
        //   message: firstIssue?._errors?.[0],
        //   color: 'red',
        // })
      } else {
        // const message = err.response?.data?.message
        //TODO: Implement toast
        // notifications.show({
        //   message: message || 'Ocorreu um erro',
        //   color: 'red',
        // })
      }
    } else if (typeof err === 'object' && err?.message) {
      //TODO: Implement toast
      // notifications.show({
      //   title: err.title || 'Ocorreu um erro',
      //   message: err.message,
      //   color: 'red',
      // })
    } else {
      // TODO: Implement toast
      // notifications.show({
      //   title: 'Ocorreu um erro',
      //   message: 'Algo deu errado, tente novamente mais tarde',
      //   color: 'red',
      // })
    }
  },
}))
