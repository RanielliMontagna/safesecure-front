type Loading = boolean

export interface AppState {
  loading: Loading
}

export interface ErrorBackendResponse {
  title?: string
  message: string
}

export interface AppStore extends AppState {
  setLoading: (loading: Loading) => void
  clearStore: () => void
  handleError: (error: unknown | ErrorBackendResponse) => void
}
