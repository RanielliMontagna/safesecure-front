import React from 'react'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'
import { Input, Button, Label, Alert, AlertTitle } from '@/components'
import { useLoginForm } from './useLoginForm'

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const { errors, isLoading, onSubmit, register } = useLoginForm()

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-4">
            <div className="grid gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="nome@exemplo.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                {...register('email', {
                  required: 'Informe um email',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Informe um email válido',
                  },
                })}
              />
              {errors.email && (
                <Alert
                  variant={
                    errors.email.type === 'required' ? 'warning' : 'destructive'
                  }>
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <AlertTitle>{errors.email.message}</AlertTitle>
                </Alert>
              )}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                placeholder="********"
                type="password"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
                {...register('password', { required: 'Informe uma senha' })}
              />
              {errors.password && (
                <Alert variant="warning">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <AlertTitle>{errors.password.message}</AlertTitle>
                </Alert>
              )}
            </div>
          </div>
          <Button disabled={isLoading}>Entrar</Button>
        </div>
      </form>
    </div>
  )
}
