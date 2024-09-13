export interface CreateEmployeePayload {
  name: string
  cpf: string
  registration: number
  sector: string
}

export interface ResponseEmployee extends CreateEmployeePayload {
  id: string
}
