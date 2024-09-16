export interface ResponseLog {
  id: string
  action: string
  entity: string
  details: string
  createdAt: string
}

export enum LogActions {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export enum LogActionsTranslated {
  CREATE = 'Criação',
  UPDATE = 'Atualização',
  DELETE = 'Exclusão',
}

export enum LogEntities {
  CATEGORIES = 'categories',
  EQUIPMENTS = 'equipments',
  EMPLOYEES = 'employees',
  ALLOCATIONS = 'allocations',
}

export enum LogEntitiesTranslated {
  categories = 'Categorias',
  equipments = 'Equipamentos',
  employees = 'Funcionários',
  allocations = 'Alocações',
}
