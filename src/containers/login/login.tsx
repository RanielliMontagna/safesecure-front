import { LoginForm } from './loginForm/loginForm'

import SafeSecureLogo from '@/assets/svgs/safe-secure-logo.svg'

export function Login() {
  return (
    <>
      <div className="relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            Safe Secure
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                Sistema de gerenciamento de equipamentos e funcionários, com um
                design limpo e moderno.
              </p>
              <footer className="text-sm">Feito por: Lucas cordeiro</footer>
            </blockquote>
          </div>
        </div>
        <div>
          <div className="mx-auto flex w-full flex-col space-y-6 max-w-[350px] p-8">
            <div className="flex flex-col space-y-2 text-center">
              <img
                src={SafeSecureLogo}
                alt="Safe Secure Logo"
                className="w-20 mx-auto"
              />
              <h1 className="text-2xl font-semibold tracking-tight">
                Entre com sua conta
              </h1>
              <p className="text-sm text-muted-foreground">
                Insira suas credenciais para acessar o painel de controle.
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  )
}
