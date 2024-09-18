import { Cross1Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons'

import { EmptyState, Form, CustomInput } from '@/components'
import { useIsMobile } from '@/hooks'
import { cn } from '@/utils'

import { useEmployeesData } from './useEmployeesData'
import type { EmployeesDataProps } from '../employees.types'
import { EmployeesDataTable } from './employeesData.table'
import { EmployeesDataList } from './employeesData.list'

export function EmployeesData({
  setEmployeeDialog,
  setDeleteDialog,
}: EmployeesDataProps) {
  const { isMobile } = useIsMobile()
  const { form, employees, isLoading } = useEmployeesData()

  if (employees === null) {
    return (
      <EmptyState
        title="Nenhum funcionário cadastrado"
        message={`Crie um novo funcionário clicando no botão ${
          isMobile ? 'abaixo' : 'no canto superior direito'
        }.`}
      />
    )
  }

  return (
    <Form {...form}>
      <div
        className={cn(
          'flex items-center justify-between w-full pb-4',
          isMobile && 'flex-col items-start gap-2',
        )}>
        <div className="flex items-center gap-1">
          <h2 className="text-sm font-semibold flex gap-1">
            Funcionários{' '}
            <p className="text-sm text-gray-500">
              ({String(employees?.length)})
            </p>
          </h2>
        </div>
        <div className="max-md:w-full">
          <CustomInput
            control={form.control}
            startAdornment={
              <MagnifyingGlassIcon className="w-4 h-4 text-muted-foreground" />
            }
            endAdornment={
              form.watch('search') && (
                <button
                  className="absolute p-1.5 hover:bg-gray-50 rounded-md right-2 bg-gray-100"
                  onClick={() => form.setValue('search', '')}>
                  <Cross1Icon className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              )
            }
            name="search"
            placeholder="Buscar funcionário"
          />
        </div>
      </div>
      {employees?.length === 0 && (
        <EmptyState
          title="Nenhum funcionário encontrado"
          message="Tente buscar por outro nome ou cpf ou criar um novo funcionário."
          className="h-[calc(100%-6rem)]"
        />
      )}
      {employees && employees?.length > 0 && !isMobile && (
        <EmployeesDataTable
          employees={employees}
          isLoading={isLoading}
          setDeleteDialog={setDeleteDialog}
          setEmployeeDialog={setEmployeeDialog}
        />
      )}
      {employees && employees?.length > 0 && isMobile && (
        <EmployeesDataList
          employees={employees}
          isLoading={isLoading}
          setDeleteDialog={setDeleteDialog}
          setEmployeeDialog={setEmployeeDialog}
        />
      )}
    </Form>
  )
}
